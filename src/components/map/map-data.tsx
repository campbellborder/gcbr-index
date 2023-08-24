import { GeoJSON, Tooltip } from 'react-leaflet'
import { useTheme } from "next-themes"
import useSWR from 'swr'
import * as geojson from 'geojson'
import { featureStyle, highlightFeature, resetHighlight } from '@/lib/map-utils';
import { Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext, useRef } from 'react';
import { SetFocusedFeatureContext, IndicatorContext, FocusedFeatureContext } from './map-context';
import { fetcher } from '@/lib/utils';

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

function CustomTooltip() {

  const focusedFeature = useContext(FocusedFeatureContext)

  return (
    <Tooltip sticky className='dark:!bg-slate-700 dark:!border-0 dark:!text-foreground before:!hidden'>
        <div>
          {focusedFeature && focusedFeature.properties['name']}
        </div>
      </Tooltip>
  )
}

export default function MapData() {

  // Hooks
  const indicator = useContext(IndicatorContext)
  const setFocusedFeature = useContext(SetFocusedFeatureContext)
  const geojson = useRef<L.GeoJSON>(null)
  const { resolvedTheme } = useTheme()
  const { data, error, isLoading } = useSWR(() => `/api/geo/all`, fetcher)
  
  // Feature event callbacks
  function onEachFeature(_: geojson.Feature<geojson.Geometry, any>, layer: L.Layer) {
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
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
      key={indicator.value + resolvedTheme}
      data={data}
      style={(feature) => featureStyle(feature, indicator, resolvedTheme!)}
      onEachFeature={onEachFeature}
    >
      <CustomTooltip />
    </GeoJSON>
  )
}