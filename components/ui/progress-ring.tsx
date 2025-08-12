'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  showPercentage?: boolean
  color?: string
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  className = '',
  showPercentage = true,
  color = '#2E70FF'
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="progress-ring"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: strokeDashoffset,
          }}
          transition={{
            duration: 2,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="progress-ring-bar"
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg font-bold"
          >
            {Math.round(animatedProgress)}%
          </motion.span>
        </div>
      )}
    </div>
  )
}
