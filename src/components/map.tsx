'use client'

import * as React from 'react'
import * as L from 'leaflet'
import { MapContainer, TileLayer, GeoJSON, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useTheme } from "next-themes"
import useSWR from 'swr'
import { featureStyle, onEachFeature } from '@/lib/map-utils';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"


const POSITION_CLASSES: { [position: string]: string } = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

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

  return (
    <Control position={position}>
      <h1>info here</h1>
    </Control>
  )
}

function DataControl({ position }: { position: string }) {

  return (
    <Control position={position}>
      <RadioGroup defaultValue="gcbr-index">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gcbr-index" id="gcbr-index" />
          <Label htmlFor="gcbr-index">GCBR Index</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lab-leaks" id="lab-leaks" />
          <Label htmlFor="lab-leaks">Lab leaks</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="zoonotic-disease" id="zoonotic-disease" />
          <Label htmlFor="zoonotic-disease">Zoonotic disease</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bioweapons" id="bioweapons" />
          <Label htmlFor="bioweapons">Bioweapons</Label>
        </div>
      </RadioGroup>
    </Control>
  )
}

function Control({ position, children }: { position: string, children: React.ReactElement }) {

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

  const { resolvedTheme } = useTheme()
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  // Map constants
  const center: [number, number] = [44, 0]
  const maxBounds = L.latLngBounds([-180, -180], [180, 180])
  const minZoom = 2
  const maxZoom = 10

  //TODO Fix map height and make it responsive
  return (
    <div className='w-4/5 m-auto' style={{ height: "600px" }}>
      <MapContainer center={center} zoom={minZoom} style={{ height: '100%' }} maxBounds={maxBounds} minZoom={minZoom} maxZoom={maxZoom} zoomControl={false} maxBoundsViscosity={1}>
      <TileLayer
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a> contributors'
              url={`https://api.maptiler.com/maps/dataviz-${resolvedTheme}/{z}/{x}/{y}.png?key=N6PWLkmnRcv3JuZIDvA5`}
            /> 
        { error &&  <Error />}
        { isLoading && <Loading/> }
        { !error && !isLoading &&
          <GeoJSON data={JSON.parse(data)} style={featureStyle} onEachFeature={onEachFeature} />
        }

        <DataControl position='topleft' />
        <InfoControl position='topright' />
        <LegendControl position='bottomright' />
      </MapContainer>
    </div>
  )
}
