export type MapStatus = 'instalado' | 'semMedicao' | 'Medindo'

interface MapStatusProps {
  status: MapStatus
}

const mapStatusMap: Record<MapStatus, string> = {
  instalado: 'Instalado',
  semMedicao: 'Sem medição',
  Medindo: 'Medindo',
}

export function MapStatus({ status }: MapStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'instalado' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-slate-400"
        />
      )}

      {status === 'semMedicao' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-rose-500"
        />
      )}

      {['Medindo', 'delivering'].includes(status) && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-emerald-500"
        />
      )}

      <span className="font-medium text-muted-foreground">
        {mapStatusMap[status]}
      </span>
    </div>
  )
}
