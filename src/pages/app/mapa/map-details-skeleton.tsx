import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
interface MapDetailsSkeletonProps {
  onClose: () => void
}

export const MapDetailsSkeleton: React.FC<MapDetailsSkeletonProps> = ({
  onClose,
}) => {
  return (
    <div className="space-y-6">
      <button onClick={onClose} style={{ float: 'right' }}>
        {/* <X className="mr-2 h-4 w-4" /> */}
      </button>
      <>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Telemetria
              </TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-20" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">UC</TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-[164px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Alarme</TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-[140px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Dt. Alarme
              </TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-[200px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Dt. útltima medição
              </TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-[148px]" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    </div>
  )
}
