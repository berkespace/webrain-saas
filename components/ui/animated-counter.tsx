'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AnimatedCounter({ 
  value, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  className = '',
  size = 'md'
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * value)
      
      setCount(currentCount)
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationId = requestAnimationFrame(animate)
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [value, duration, isVisible])

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals)
    : count.toLocaleString()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      className={`font-bold ${sizeClasses[size]} ${className}`}
    >
      {prefix}{formattedValue}{suffix}
    </motion.div>
  )
}
