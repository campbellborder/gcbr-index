'use client'

import { createContext, useContext, useState, ReactElement } from 'react'
import * as L from 'leaflet'
import { MapContainer, TileLayer, GeoJSON, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useTheme } from "next-themes"
import useSWR from 'swr'
import { featureStyle, onEachFeature } from '@/lib/map-utils';
import { Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IndicatorSelector } from './indicator-selector';


const POSITION_CLASSES: { [position: string]: string } = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',

}

interface MapData {
    dataType: string,
    setDataType: any,
    focusedCountry: string | null,
    setFocusedCountry: any
}

const defaultMapData: MapData = {
    dataType: "gcbr-index",
    setDataType: () => {},
    focusedCountry: null,
    setFocusedCountry: () => {}
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const MapContext = createContext(defaultMapData);

function Error() {
  return (
    <div className='flex h-full w-full place-content-center'>
    <Button className='m-auto' disabled>
      <XCircle className="mr-2 h-4 w-4" />
      Error
    </Button>
    </div>
  )
}

function Loading() {
  return (
    <div className='flex h-full w-full place-content-center'>
    <Button className='m-auto' disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
    </div>
  )
}

function LegendControl({ position }: { position: string }) {

  return (
    <Control position={position}>
      <h1>Legend</h1>
    </Control>
  )
}

function InfoControl({ position }: { position: string }) {

  const { dataType, focusedCountry } = useContext(MapContext)

  return (
    <Control position={position}>
      <h1>{dataType}</h1>
    </Control>
  )
}

function DataControl({ position }: { position: string }) {

  const { dataType, setDataType } = useContext(MapContext)

  return (
    <Control position={position}>
      <IndicatorSelector dataType={dataType} setDataType={setDataType}/>
    </Control>
  )
}

function Control({ position, children }: { position: string, children: ReactElement }) {

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar bg-white dark:bg-slate-950 p-2">
        {children}
      </div>
    </div>
  )
}

export default function Map() {

  const [dataType, setDataType] = useState('gcbr-index')
  const [focusedCountry, setFocusedCountry] = useState<string | null>(null)
  const map_data = { dataType: dataType, setDataType: setDataType, focusedCountry: focusedCountry, setFocusedCountry: setFocusedCountry }

  const { resolvedTheme } = useTheme()
  const { data, error, isLoading } = useSWR(`/api/geo/${dataType}`, fetcher)

  // Map constants
  const center: [number, number] = [44, 0]
  const maxBounds = L.latLngBounds([-90, -180], [90, 180])
  const minZoom = 2
  const maxZoom = 10

  //TODO Fix map height and make it responsive
  return (
    <MapContext.Provider value={map_data}>
    <div className='w-4/5 h-[600px] m-auto'>
      <MapContainer center={center} zoom={minZoom} style={{ height: '100%' }} maxBounds={maxBounds} minZoom={minZoom} maxZoom={maxZoom} zoomControl={false} maxBoundsViscosity={1}>
      <TileLayer
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a> contributors'
              url={`https://api.maptiler.com/maps/dataviz-${resolvedTheme}/{z}/{x}/{y}.png?key=N6PWLkmnRcv3JuZIDvA5`}
            /> 
        { error && <Error />}
        { isLoading && <Loading/> }
        { !error && !isLoading &&
          <GeoJSON data={data} style={featureStyle} onEachFeature={onEachFeature} />
        }

        <DataControl position='topleft' />
        <InfoControl position='topright' />
        <LegendControl position='bottomleft' />
      </MapContainer>
    </div>
    </MapContext.Provider>
  )
}
