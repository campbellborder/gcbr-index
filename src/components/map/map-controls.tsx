import { colour_scale } from '@/lib/map-utils';
import { useContext, ReactElement } from 'react'
import { MapContext } from '@/components/map/map-context';
import { IndicatorSelector } from '@/components/map/indicator-selector';

const POSITION_CLASSES: { [position: string]: string } = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

function LegendControl({ position }: { position: string }) {

  return (
    <Control position={position}>
      <>
      <div className="p-2">
        {[...Array(6).keys()].map((i) => {
          var number = 100 - i * 20
          var colour = colour_scale(number).hex()
          return (
            <div key={i} className='h-4'>
            <i className={"w-4 h-full float-left mr-2 z-[5000]"} style={{background: colour}}></i>
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

  function displayValue(s: string) {
    var num = Number(s)
    if (Number.isInteger(num)) {
      return num.toFixed(0)
    }
    return num.toFixed(2)
  }

  return (
    <Control position={position}>
      <div className='p-2 w-[200px]'>
      <h1 className='text-center font-bold'>{focusedFeature ? focusedFeature.properties['name-en'] : "Hover over a country"}</h1>
      {focusedFeature &&
      <h2 className='text-center'>{displayValue(focusedFeature.properties[indicator.value])}</h2>
      }
      </div>
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
      <div className="leaflet-control bg-white dark:bg-[#020817] rounded-md">
        {children}
      </div>
    </div>
  )
}

export default function MapControls() {

  return (
    <>
    <DataControl position='topleft' />
    <InfoControl position='topright' />
    <LegendControl position='bottomleft' />
    </>
  )
}