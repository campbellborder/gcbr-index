'use client'

import * as geojson from 'geojson';
import * as React from 'react'
import * as L from 'leaflet'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useTheme } from "next-themes"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function style(feature: any) {
    return {
        fillColor: 'slate',
        fillOpacity: 1,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
    };
}

function highlightFeature(e: L.LeafletMouseEvent) {
    var feature = e.target;

    feature.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}

function resetHighlight(e: L.LeafletMouseEvent) {
    var feature = e.target;

    feature.setStyle({
        weight: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.sendToBack();
    }
}

function onEachFeature(feature: geojson.Feature<geojson.Geometry, any>, layer: L.Layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    })
}

export default function Map() {

  const { resolvedTheme } = useTheme()
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  return ( <div>
    <h1></h1>
    <div className='w-4/5 m-auto' style={{height: "600px"}}>
      <MapContainer center={[36, 10]} zoom={2} scrollWheelZoom={true} style={{height: '100%',}}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a> contributors'
          url={`https://api.maptiler.com/maps/dataviz-${resolvedTheme}/{z}/{x}/{y}.png?key=N6PWLkmnRcv3JuZIDvA5`}
        />
        {!error && !isLoading &&
            <GeoJSON data={JSON.parse(data)} style={style} onEachFeature={onEachFeature}/>
        }

      </MapContainer>

    </div>
    </div>
  )
}