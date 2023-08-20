'use client'

import { createContext, useContext, useState, ReactElement } from 'react'
import * as L from 'leaflet'
import * as geojson from 'geojson'
import { MapContainer, TileLayer, GeoJSON, Rectangle, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useTheme } from "next-themes"
import useSWR from 'swr'
import { featureStyle, featureStyleDark, highlightFeature, resetHighlight, colour_scale } from '@/lib/map-utils';
import { Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IndicatorSelector } from './indicator-selector';
import { Indicator, indicators } from '@/lib/indicators';


const POSITION_CLASSES: { [position: string]: string } = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

interface MapData {
    indicator: Indicator,
    setIndicator: any,
    focusedFeature: any,
    setFocusedFeature: any
}

const defaultMapData: MapData = {
    indicator: indicators[0],
    setIndicator: () => {},
    focusedFeature: null,
    setFocusedFeature: () => {}
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

  const colourClasses = [
    
  ]

  return (
    <Control position={position}>
      <>
      <div>
        {[...Array(11).keys()].map((i) => {
          var number = 100 - i * 10
          var colour = colour_scale(number).hex()
          return (
            <div key={i}>
            <i className={"w-4 h-4 float-left mr-3 z-[5000]"} style={{background: colour}}></i>
            {number}
            <br/>
            </div>)
        })}
      </div>
      </>
    </Control>
  )
}

function InfoControl({ position }: { position: string }) {

  const { indicator, focusedFeature } = useContext(MapContext)

  return (
    <Control position={position}>
      {focusedFeature &&
      <div>
      <h1 className='text-center '>{focusedFeature.properties['name-en']}</h1>
      <h2>{indicator.label}: {parseFloat(focusedFeature.properties.value).toFixed(2)}</h2>
      </div>}
    </Control>
  )
}

function DataControl({ position }: { position: string }) {

  const { indicator, setIndicator } = useContext(MapContext)

  return (
    <Control position={position}>
      <IndicatorSelector indicator={indicator} setIndicator={setIndicator}/>
    </Control>
  )
}

function Control({ position, children }: { position: string, children: ReactElement }) {

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar bg-white dark:bg-[#020817] p-2 border-none">
        {children}
      </div>
    </div>
  )
}

function Bounds() {

  var map = useMap()
  map.setMaxBounds(map.getBounds())

  return <></>
}

export default function Map() {

  const [indicator, setIndicator] = useState(indicators[0])
  const [focusedFeature, setFocusedFeature] = useState<any>(null)
  const map_data = { indicator: indicator, setIndicator: setIndicator, focusedFeature: focusedFeature, setFocusedFeature: setFocusedFeature }

  const { resolvedTheme } = useTheme()
  const { data, error, isLoading } = useSWR(`/api/geo/${indicator.value}`, fetcher)

  function onEachFeature(feature: geojson.Feature<geojson.Geometry, any>, layer: L.Layer) {
    layer.on({
        mouseover: (e: L.LeafletMouseEvent) => {
          const feature = highlightFeature(e);
          setFocusedFeature(feature)
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          resetHighlight(e);
          setFocusedFeature(null)
        }
    })
}

  // Map constants
  const center: [number, number] = [30, 0]
  const minZoom = 1.5
  const maxZoom = 10
  const zoomSnap = 0.5

  //TODO Fix map height and make it responsive
  return (
    <MapContext.Provider value={map_data}>
    <div className='w-full md:w-4/5 h-[600px] m-auto'>
    <MapContainer center={center} zoom={minZoom} style={{ height: '100%', background: 'transparent' }} minZoom={minZoom} maxZoom={maxZoom} zoomSnap={zoomSnap} zoomControl={false} maxBoundsViscosity={1}>
      {/* <TileLayer
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a> contributors'
              url={`https://api.maptiler.com/maps/dataviz-${resolvedTheme}/{z}/{x}/{y}.png?key=N6PWLkmnRcv3JuZIDvA5`}
            />  */}
        <Bounds/>
        { error && <Error />}
        { isLoading && <Loading/> }
        { !error && !isLoading &&
          <GeoJSON data={data} style={resolvedTheme == "light" ? featureStyle : featureStyleDark} onEachFeature={onEachFeature} attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a> contributors'/>
        }
        <DataControl position='topleft' />
        <InfoControl position='topright' />
        <LegendControl position='bottomleft' />
        
      </MapContainer>
    </div>
    </MapContext.Provider>
  )
}
