'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
  loading?: boolean
}

export interface SearchFilters {
  searchTerm: string
  status: string
  saticiTipi: string
  startDate: string
  endDate: string
  urunId: string
  komisyoncuId: string
  minKg: string
  maxKg: string
}

export function AdvancedSearch({ onSearch, onClear, loading = false }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    status: 'all',
    saticiTipi: 'all',
    startDate: '',
    endDate: '',
    urunId: '',
    komisyoncuId: '',
    minKg: '',
    maxKg: ''
  })

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClear = () => {
    setFilters({
      searchTerm: '',
      status: 'all',
      saticiTipi: 'all',
      startDate: '',
      endDate: '',
      urunId: '',
      komisyoncuId: '',
      minKg: '',
      maxKg: ''
    })
    onClear()
  }

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Gelişmiş Arama
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Basic Search */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Fiş no, satıcı, ürün veya notlar ile ara..."
              value={filters.searchTerm}
              onChange={(e) => handleInputChange('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="mr-2 h-4 w-4" />
            Ara
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <X className="mr-2 h-4 w-4" />
            Temizle
          </Button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Durum</Label>
              <Select value={filters.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
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
                  <SelectValue placeholder="Satıcı tipi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="OZEL_FIRMA">Özel Firma</SelectItem>
                  <SelectItem value="KOMISYONCU">Komisyoncu</SelectItem>
                  <SelectItem value="MUSTAHSIL">Müstahsil</SelectItem>
                </SelectContent>
              </Select>
            </div>

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

            <div className="space-y-2">
              <Label>Minimum KG</Label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minKg}
                onChange={(e) => handleInputChange('minKg', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Maksimum KG</Label>
              <Input
                type="number"
                placeholder="1000"
                value={filters.maxKg}
                onChange={(e) => handleInputChange('maxKg', e.target.value)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
