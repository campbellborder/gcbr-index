import dynamic from 'next/dynamic';
import MapContextProvider from '@/components/map/map-context';

const Map = dynamic(() => import('@/components/map/map'), {
  ssr: false,
});

export default function Home() {

  return (
    <main className="container flex-col content-center mt-14 p-0">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center p-5 md:p-8 lg:p-12">Global Catastrophic Biological Risks Index</h1>
      <MapContextProvider>
        <Map/>
      </MapContextProvider>
    </main>
  )
}
