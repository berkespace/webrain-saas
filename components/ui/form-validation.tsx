'use client'

import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface ValidationError {
  field: string
  message: string
  type: 'error' | 'warning' | 'info'
}

interface FormValidationProps {
  errors: ValidationError[]
  onClear?: () => void
}

export function FormValidation({ errors, onClear }: FormValidationProps) {
  if (errors.length === 0) return null

  const groupedErrors = errors.reduce((acc, error) => {
    if (!acc[error.type]) {
      acc[error.type] = []
    }
    acc[error.type].push(error)
    return acc
  }, {} as Record<string, ValidationError[]>)

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'info':
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getVariant = (type: string) => {
    switch (type) {
      case 'error':
        return 'destructive'
      case 'warning':
        return 'default'
      case 'info':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-2">
      {Object.entries(groupedErrors).map(([type, typeErrors]) => (
        <Alert key={type} variant={getVariant(type) as any}>
          {getIcon(type)}
          <AlertDescription>
            <div className="space-y-1">
              {typeErrors.map((error, index) => (
                <div key={index} className="text-sm">
                  <strong>{error.field}:</strong> {error.message}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

// Validation utility functions
export const validateRequired = (value: any, fieldName: string): ValidationError | null => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      field: fieldName,
      message: `${fieldName} alanı zorunludur`,
      type: 'error'
    }
  }
  return null
}

export const validateEmail = (email: string, fieldName: string): ValidationError | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email && !emailRegex.test(email)) {
    return {
      field: fieldName,
      message: 'Geçerli bir e-posta adresi giriniz',
      type: 'error'
    }
  }
  return null
}

export const validateNumber = (value: any, fieldName: string, min?: number, max?: number): ValidationError | null => {
  const num = parseFloat(value)
  if (isNaN(num)) {
    return {
      field: fieldName,
      message: `${fieldName} alanı sayısal olmalıdır`,
      type: 'error'
    }
  }
  if (min !== undefined && num < min) {
    return {
      field: fieldName,
      message: `${fieldName} alanı en az ${min} olmalıdır`,
      type: 'error'
    }
  }
  if (max !== undefined && num > max) {
    return {
      field: fieldName,
      message: `${fieldName} alanı en fazla ${max} olmalıdır`,
      type: 'error'
    }
  }
  return null
}

export const validateDate = (date: string, fieldName: string): ValidationError | null => {
  if (date && isNaN(Date.parse(date))) {
    return {
      field: fieldName,
      message: 'Geçerli bir tarih giriniz',
      type: 'error'
    }
  }
  return null
}

export const validateDateRange = (startDate: string, endDate: string): ValidationError | null => {
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return {
      field: 'Tarih Aralığı',
      message: 'Başlangıç tarihi bitiş tarihinden büyük olamaz',
      type: 'error'
    }
  }
  return null
}
