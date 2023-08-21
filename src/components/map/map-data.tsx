import { Indicator } from '@/lib/indicators';
import { GeoJSON, useMap } from 'react-leaflet'
import { useTheme } from "next-themes"
import useSWR from 'swr'
import * as geojson from 'geojson'
import { featureStyle, featureStyleDark, highlightFeature, resetHighlight } from '@/lib/map-utils';
import { Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext, useRef } from 'react';
import { MapContext } from './map-context';

// Fetch function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Display error message
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

// Display loading message
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

export default function MapData() {

  // Hooks
  const { indicator, setFocusedFeature } = useContext(MapContext)
  const geojson = useRef<L.GeoJSON>(null)
  const { resolvedTheme } = useTheme()
  const { data, error, isLoading } = useSWR(() => `/api/geo/${indicator.value}`, fetcher)

  // Feature event callbacks
  function onEachFeature(_: geojson.Feature<geojson.Geometry, any>, layer: L.Layer) {
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        console.log(e)
        const feature = highlightFeature(e.target);
        setFocusedFeature(feature)
      },
      mouseout: (e: L.LeafletMouseEvent) => {
        if (geojson.current) {
          resetHighlight(e.target, geojson.current)
        }
        setFocusedFeature(null)
      }
    })
  }

  if (error) return <Error/>
  if (isLoading) return <Loading/>
  return (
    <GeoJSON
      ref={geojson}
      key={indicator.value}
      data={data}
      style={resolvedTheme == "light" ? featureStyle : featureStyleDark}
      onEachFeature={onEachFeature}
    />
  )
}