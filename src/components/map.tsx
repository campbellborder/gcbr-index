'use client'

import * as React from 'react'
import * as L from 'leaflet'
import { MapContainer, TileLayer, GeoJSON, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useTheme } from "next-themes"
import useSWR from 'swr'
import { featureStyle, onEachFeature } from '@/lib/map-utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Map() {

  const { resolvedTheme } = useTheme()
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  // Map constants
  const center: [number, number] = [44, 0]
  const maxBounds = L.latLngBounds([-180, -180], [180, 180])
  const minZoom = 2
  const maxZoom = 10

  return (
    <div className='w-4/5 m-auto' style={{height: "600px"}}>
      <MapContainer center={center} zoom={minZoom} style={{height: '100%',}} maxBounds={maxBounds} minZoom={minZoom} maxZoom={maxZoom}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a> contributors'
          url={`https://api.maptiler.com/maps/dataviz-${resolvedTheme}/{z}/{x}/{y}.png?key=N6PWLkmnRcv3JuZIDvA5`}
        />
        {!error && !isLoading &&
            <GeoJSON data={JSON.parse(data)} style={featureStyle} onEachFeature={onEachFeature}/>
        }
      </MapContainer>
    </div>
  )
}