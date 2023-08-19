import Link from 'next/link'
import dynamic from 'next/dynamic';
import { IndicatorSelector } from '@/components/indicator-selector';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="container flex-col content-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-center p-5 md:p-12">Global Catastrophic Biohazard Risks Index</h1>
      <Map/>
    </main>
  )
}
