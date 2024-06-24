import 'ol/ol.css'

import { FeatureLike } from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import View from 'ol/View'
import React, { useEffect, useRef, useState } from 'react'

import {
  getGeoServerData,
  GetGeoServerDataResponse,
} from '@/api/get-map-details'

import { MapDetails } from './map-details'

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedFeature, setSelectedFeature] = useState<FeatureLike | null>(
    null,
  )
  const [mapData, setMapData] = useState<GetGeoServerDataResponse | null>(null)
  const [dialogPosition, setDialogPosition] = useState<{
    left: number
    top: number
  } | null>(null)

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await getGeoServerData()
        setMapData(data)
      } catch (error) {
        console.error('Error fetching map data:', error)
      }
    }

    fetchMapData()
  }, [])

  useEffect(() => {
    if (mapRef.current && mapData) {
      const pontosVector = new VectorSource({
        format: new GeoJSON(),
        url: 'https://geoserver-nexum.com/geoserver/Sanepar/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Sanepar%3Aview_alarms_telemetry_2&outputFormat=application%2Fjson',
      })

      const pontosVectorLayer = new VectorLayer({
        source: pontosVector,
      })

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          pontosVectorLayer,
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      })

      const handleClick = (event: MapBrowserEvent<UIEvent>) => {
        const clickedFeature = map.forEachFeatureAtPixel(
          event.pixel,
          (feature: FeatureLike) => feature,
        )

        if (clickedFeature) {
          setSelectedFeature(clickedFeature)
          if (mapRef.current) {
            const mapRect = mapRef.current.getBoundingClientRect()
            const dialogLeft = event.pixel[0] + 20
            const dialogTop = event.pixel[1] - 20
            const adjustedLeft = Math.min(dialogLeft, mapRect.width - 20)
            const adjustedTop = Math.min(dialogTop, mapRect.height - 20)
            setDialogPosition({
              left: Math.max(0, adjustedLeft),
              top: Math.max(0, adjustedTop),
            })
          }
        }
      }
      map.on('click', handleClick)

      return () => {
        map.setTarget(undefined)
        map.un('click', handleClick)
      }
    }
  }, [mapData])

  const handleCloseDialog = () => {
    setSelectedFeature(null)
    setDialogPosition(null)
  }

  return (
    <>
      <div
        ref={mapRef}
        style={{ position: 'relative', width: '100%', height: '100vh' }}
      >
        {selectedFeature && dialogPosition && (
          <div
            style={{
              position: 'absolute',
              left: `${dialogPosition.left}px`,
              top: `${dialogPosition.top}px`,
              backgroundColor: 'black',
              padding: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              zIndex: 1000,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <MapDetails
              open={true}
              onClose={handleCloseDialog}
              mapData={mapData}
              selectedFeature={selectedFeature}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default MapComponent
