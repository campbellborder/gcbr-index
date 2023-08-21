'use client'

import 'leaflet/dist/leaflet.css';
import {useState, useEffect } from 'react'
import * as L from 'leaflet'
import { MapContainer, useMap } from 'react-leaflet'
import { indicators } from '@/lib/indicators';
import MapData from './map-data';
import MapControls from './map-controls';
import { MapContext } from '@/contexts/map-context';

// Handle automatic setting of bounds and minimum zoom
function MapBounds({bounds}: {bounds: L.LatLngBounds}) {

  var map = useMap()
  useEffect(() => {
    map.fitBounds(bounds)
    map.setMaxBounds(map.getBounds())
    map.setMinZoom(map.getZoom())
  }, [])

  return null
}

export default function Map() {

  // Map state
  const [indicator, setIndicator] = useState(indicators[0])
  const [focusedFeature, setFocusedFeature] = useState<any>(null)
  const map_data = { indicator: indicator, setIndicator: setIndicator, focusedFeature: focusedFeature, setFocusedFeature: setFocusedFeature }

  // Map constants
  const center: [number, number] = [30, 0]
  const bounds = L.latLngBounds([[-60, -175], [84.5, 195]])
  const maxZoom = 5
  const zoomSnap = 0.1
  const zoomDelta = 1

  // Renderer (for setting custom padding)
  const renderer: L.Renderer = L.svg({padding: 1})

  //TODO Fix map height and make it responsive (width is done)
  return (
    <div className='w-[90%] lg:w-4/6 h-[550px] m-auto'>
    <MapContext.Provider value={map_data}>
    <MapContainer
      center={center}
      style={{ height: '100%', background: 'transparent' }}
      maxZoom={maxZoom}
      zoomSnap={zoomSnap}
      zoomControl={false}
      zoomDelta={zoomDelta}
      maxBoundsViscosity={1}
      wheelPxPerZoomLevel={10}
      renderer={renderer}>

      <MapBounds bounds={bounds}/>
      <MapControls />
      <MapData indicator={indicator} setFocusedFeature={setFocusedFeature}/>
    
    </MapContainer>
    </MapContext.Provider>
    </div>
  )
}