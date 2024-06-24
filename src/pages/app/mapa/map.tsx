import React from 'react'
import { Helmet } from 'react-helmet-async'

import MapComponent from './map-component'

const Map: React.FC = () => {
  return (
    <>
      <Helmet title="Mapa de Telemetria" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Mapa de Telemetria
        </h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <div>
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Map
