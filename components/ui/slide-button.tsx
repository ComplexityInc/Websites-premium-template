"use client"

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from "lucide-react"

import { cn } from "@/lib/utils"

const DRAG_CONSTRAINTS = { left: 0, right: 155 }
const DRAG_THRESHOLD = 0.9

const BUTTON_STATES = {
  initial: { width: "100%" },
  completed: { width: "8rem" },
}

const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
}

type StatusIconProps = {
  status: string
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const iconMap: Record<StatusIconProps["status"], JSX.Element> = useMemo(
    () => ({
      loading: <Loader2 className="animate-spin text-white" size={20} />,
      success: <Check size={20} className="text-white" />,
      error: <X size={20} className="text-white" />,
    }),
    []
  )

  if (!iconMap[status]) return null

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {iconMap[status]}
    </motion.div>
  )
}

export interface SlideButtonProps {
  onSlideComplete?: () => void
  status?: "idle" | "loading" | "success" | "error"
  className?: string
  disabled?: boolean
  label?: string
}

export const SlideButton = forwardRef<HTMLDivElement, SlideButtonProps>(
  ({ onSlideComplete, status = "idle", className, disabled = false, label = "SEND MESSAGE" }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [completed, setCompleted] = useState(false)
    const dragHandleRef = useRef<HTMLDivElement | null>(null)

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    )

    const handleDragStart = useCallback(() => {
      if (completed || disabled) return
      setIsDragging(true)
    }, [completed, disabled])

    const handleDragEnd = useCallback(() => {
      if (completed || disabled) return
      setIsDragging(false)

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true)
        onSlideComplete?.()
      } else {
        dragX.set(0)
      }
    }, [completed, disabled, dragProgress, dragX, onSlideComplete])

    const handleDrag = useCallback((
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (completed || disabled) return
      const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
      dragX.set(newX)
    }, [completed, disabled, dragX])

    const adjustedWidth = useTransform(springX, (x) => x + 48)

    // Reset when status changes back to idle
    React.useEffect(() => {
      if (status === "idle" && completed) {
        setCompleted(false)
        dragX.set(0)
      }
    }, [status, completed, dragX])

    return (
      <motion.div
        ref={ref}
        animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
        transition={ANIMATION_CONFIG.spring}
        className={cn(
          "relative flex h-14 items-center justify-center rounded-md bg-muted/30 border border-border overflow-hidden",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Progress fill */}
        {!completed && (
          <motion.div
            style={{
              width: adjustedWidth,
            }}
            className="absolute inset-y-0 left-0 z-0 bg-accent"
          />
        )}

        {/* Label text */}
        {!completed && (
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium uppercase tracking-wide text-muted-foreground z-0 pointer-events-none">
            {label}
          </span>
        )}

        {/* Drag handle */}
        <AnimatePresence>
          {!completed && (
            <motion.div
              ref={dragHandleRef}
              drag={disabled ? false : "x"}
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: springX }}
              className="absolute left-0 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
              exit={{ opacity: 0 }}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground shadow-lg ml-1",
                  isDragging && "scale-105 transition-transform"
                )}
              >
                <SendHorizontal className="size-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed state */}
        <AnimatePresence>
          {completed && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-accent rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence mode="wait">
                <StatusIcon status={status} />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
)

SlideButton.displayName = "SlideButton"
