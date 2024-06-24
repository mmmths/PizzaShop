import axios from 'axios'

// Interface para representar a propriedade "properties" de GeoServerFeature
export interface GeoServerFeatureProperties {
  regiao: string
  orgao_pagador: string
  cod_orgao_pagador: string
  municipio: string
  concessionaria: string
  unidade_consumidora: string
  unidade: string
  endereco: string
  credito_csbio: string
  latitude: number
  longitude: number
  telemetria: boolean
}

// Interface para representar cada feature retornada pela API GeoServer
export interface GeoServerFeature {
  type: string
  id: string
  geometry: {
    type: string
    coordinates: [number, number]
  }
  geometry_name: string
  properties: GeoServerFeatureProperties
}

// Interface para representar a resposta completa da API GeoServer
export interface GetGeoServerDataResponse {
  type: string
  features: GeoServerFeature[]
  totalFeatures: number
  numberMatched: number
  numberReturned: number
  timeStamp: string
  crs: {
    type: string
    properties: {
      name: string
    }
  }
}

// Função para buscar dados da API GeoServer
export async function getGeoServerData(): Promise<GetGeoServerDataResponse> {
  const geoServerUrl =
    'https://geoserver-nexum.com/geoserver/Sanepar/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Sanepar%3Aview_alarms_telemetry_2&outputFormat=application%2Fjson'

  const response = await axios.get<GetGeoServerDataResponse>(geoServerUrl)
  return response.data
}

// Interface para props do componente MapTableRow
export interface MapTableRowProps {
  order: {
    mapData: GeoServerFeature | null
    unidade_consumidora?: string // tornando opcional
  }
}
