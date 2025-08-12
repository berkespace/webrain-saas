'use client'

import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useTheme } from 'next-themes'

interface ChartData {
  name: string
  value: number
  secondary?: number
}

interface DashboardChartProps {
  data: ChartData[]
  type?: 'area' | 'bar'
  height?: number
  className?: string
  title?: string
  color?: string
  secondaryColor?: string
}

export function DashboardChart({ 
  data, 
  type = 'area',
  height = 300,
  className = '',
  title,
  color = '#2E70FF',
  secondaryColor = '#F093FB'
}: DashboardChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg"
        >
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </motion.div>
      )
    }
    return null
  }

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <motion.div
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      className={`p-4 ${className}`}
    >
      {title && (
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg font-semibold mb-4 text-foreground"
        >
          {title}
        </motion.h3>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        {type === 'area' ? (
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
              {data.some(d => d.secondary !== undefined) && (
                <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.1}/>
                </linearGradient>
              )}
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#E5E7EB'}
              strokeOpacity={0.5}
            />
            <XAxis 
              dataKey="name" 
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            {data.some(d => d.secondary !== undefined) && (
              <Area
                type="monotone"
                dataKey="secondary"
                stroke={secondaryColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSecondary)"
              />
            )}
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#E5E7EB'}
              strokeOpacity={0.5}
            />
            <XAxis 
              dataKey="name" 
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={isDark ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill={color}
              radius={[4, 4, 0, 0]}
            />
            {data.some(d => d.secondary !== undefined) && (
              <Bar 
                dataKey="secondary" 
                fill={secondaryColor}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  )
}
