'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Calendar,
  Loader2
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface DataExportProps {
  onExport: (format: 'excel' | 'pdf', filters: ExportFilters) => void
  loading?: boolean
}

export interface ExportFilters {
  format: 'excel' | 'pdf'
  dateRange: 'today' | 'week' | 'month' | 'custom'
  startDate: string
  endDate: string
  includeHeaders: boolean
  status: string
  saticiTipi: string
}

export function DataExport({ onExport, loading = false }: DataExportProps) {
  const [filters, setFilters] = useState<ExportFilters>({
    format: 'excel',
    dateRange: 'month',
    startDate: '',
    endDate: '',
    includeHeaders: true,
    status: 'all',
    saticiTipi: 'all'
  })

  const handleExport = () => {
    onExport(filters.format, filters)
  }

  const handleInputChange = (field: keyof ExportFilters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Veri Dışa Aktarma
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dosya Formatı</Label>
            <Select value={filters.format} onValueChange={(value: 'excel' | 'pdf') => handleInputChange('format', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel (.xlsx)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF (.pdf)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tarih Aralığı</Label>
            <Select value={filters.dateRange} onValueChange={(value: 'today' | 'week' | 'month' | 'custom') => handleInputChange('dateRange', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Bugün</SelectItem>
                <SelectItem value="week">Bu Hafta</SelectItem>
                <SelectItem value="month">Bu Ay</SelectItem>
                <SelectItem value="custom">Özel Aralık</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filters.dateRange === 'custom' && (
            <>
              <div className="space-y-2">
                <Label>Başlangıç Tarihi</Label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Bitiş Tarihi</Label>
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Durum Filtresi</Label>
            <Select value={filters.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="FATURA_BEKLIYOR">Fatura Bekliyor</SelectItem>
                <SelectItem value="FATURALANDI">Faturalandı</SelectItem>
                <SelectItem value="TAMAMLANDI">Tamamlandı</SelectItem>
                <SelectItem value="IPTAL">İptal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Satıcı Tipi</Label>
            <Select value={filters.saticiTipi} onValueChange={(value) => handleInputChange('saticiTipi', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                <SelectItem value="KOMISYONCU">Komisyoncu</SelectItem>
                <SelectItem value="MUSTAHSIL">Müstahsil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button 
            onClick={handleExport} 
            disabled={loading}
            className="min-w-[120px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                İndiriliyor...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Dışa Aktar
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
