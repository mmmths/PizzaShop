import { useQuery } from '@tanstack/react-query'
import { FeatureLike } from 'ol/Feature'

import {
  getGeoServerData,
  GetGeoServerDataResponse,
} from '@/api/get-map-details'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { MapDetailsSkeleton } from './map-details-skeleton'

export interface MapDetailsProps {
  open: boolean
  onClose: () => void
  mapData: GetGeoServerDataResponse | null
  selectedFeature: FeatureLike | null
}

export function MapDetails({
  open,
  onClose,
  mapData,
  selectedFeature,
}: MapDetailsProps) {
  console.log('selectedFeature', selectedFeature)
  const {
    data: map,
    isLoading,
    error,
  } = useQuery<GetGeoServerDataResponse>({
    queryKey: ['map', mapData?.features],
    queryFn: () => getGeoServerData(),
    enabled: open && !mapData,
  })

  if (!open) return null

  if (isLoading) {
    return <MapDetailsSkeleton onClose={onClose} />
  }

  if (error) {
    return <div>Error loading map details</div>
  }

  const properties = selectedFeature?.getProperties()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>Detalhes do mapa</DialogDescription>
          <DialogClose />
        </DialogHeader>
        {map ? (
          <div className="space-y-6">
            <Table>
              <TableBody>
                {properties &&
                  Object.entries(properties)
                    .filter(([key]) => {
                      // Lista dos campos que você deseja incluir
                      const allowedFields = [
                        'concessionaria',
                        'endereco',
                        'fim_interval_15',
                        'identification_number',
                        'last_date',
                        'last_measure',
                        'last_measure_date',
                        'latitude',
                        'longitude',
                        'municipio',
                        'orgao_pagador',
                        'regiao',
                        'type',
                        'unidade',
                        'uuid_circuit',
                      ]
                      // Retorna verdadeiro se a chave estiver na lista de campos permitidos
                      return allowedFields.includes(key)
                    })
                    .map(([key, value], index) => (
                      <TableRow key={index}>
                        <TableCell className="flex justify-end">
                          {properties[key]}
                        </TableCell>

                        <TableCell className="flex justify-end">
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <MapDetailsSkeleton onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
