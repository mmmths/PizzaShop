// import { formatDistanceToNow } from 'date-fns'
// import { ptBR } from 'date-fns/locale'
// import { useEffect, useState } from 'react'

// import { GeoServerFeature, getGeoServerData } from '@/api/get-map-details'
// import { Button } from '@/components/ui/button'
// import { Dialog, DialogTrigger } from '@/components/ui/dialog'
// import { TableCell, TableRow } from '@/components/ui/table'

// import { MapDetails } from './map-details'

// export interface MapTableRowProps {
//   order: {
//     mapData: GeoServerFeature | null
//     unidade_consumidora: string
//   }
// }

// export function MapTableRow({ order }: MapTableRowProps) {
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await getGeoServerData()
//       } catch (error) {
//         console.error('Error fetching GeoServer data:', error)
//       }
//     }
//     fetchData()
//   }, [])

//   return (
//     <TableRow>
//       <TableCell>
//         <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
//           <DialogTrigger asChild>
//             <Button variant="outline" size="xs">
//               Detalhes
//             </Button>
//           </DialogTrigger>
//           <MapDetails
//             open={isDetailsOpen}
//             onClose={() => setIsDetailsOpen(false)}
//             mapData={order.mapData}
//           />
//         </Dialog>
//       </TableCell>
//       <TableCell className="font-mono text-xs font-medium">
//         {order.mapData ? order.mapData.properties.unidade_consumidora : 'N/A'}
//       </TableCell>
//       <TableCell className="text-muted-foreground">
//         {order.mapData
//           ? formatDistanceToNow(order.mapData.properties.unidade_consumidora, {
//               locale: ptBR,
//               addSuffix: true,
//             })
//           : 'N/A'}
//       </TableCell>
//       <TableCell>
//         {order.mapData ? order.mapData.properties.unidade_consumidora : 'N/A'}
//       </TableCell>
//       <TableCell className="font-medium">
//         {order.mapData ? order.mapData.properties.unidade_consumidora : 'N/A'}{' '}
//       </TableCell>
//       <TableCell>
//         <Button variant="ghost" size="xs">
//           Cancelar
//         </Button>
//       </TableCell>
//     </TableRow>
//   )
// }
