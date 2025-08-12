'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

interface TrendIndicatorProps {
  value: number
  className?: string
  showIcon?: boolean
  showSign?: boolean
}

export function TrendIndicator({ 
  value, 
  className = '',
  showIcon = true,
  showSign = true
}: TrendIndicatorProps) {
  const isPositive = value > 0
  const isNegative = value < 0
  const isNeutral = value === 0

  const getColor = () => {
    if (isPositive) return 'text-green-500'
    if (isNegative) return 'text-red-500'
    return 'text-gray-500'
  }

  const getIcon = () => {
    if (isPositive) return <TrendingUp className="h-4 w-4" />
    if (isNegative) return <TrendingDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  const getBackgroundColor = () => {
    if (isPositive) return 'bg-green-50 dark:bg-green-950/20'
    if (isNegative) return 'bg-red-50 dark:bg-red-950/20'
    return 'bg-gray-50 dark:bg-gray-950/20'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${getBackgroundColor()} ${getColor()} ${className}`}
    >
      {showIcon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {getIcon()}
        </motion.div>
      )}
      <span className="text-sm font-medium">
        {showSign && !isNeutral && (isPositive ? '+' : '')}{value.toFixed(1)}%
      </span>
    </motion.div>
  )
}
