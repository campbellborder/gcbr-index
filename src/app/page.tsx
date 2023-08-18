import Link from 'next/link'
import dynamic from 'next/dynamic';
import { IndicatorSelector } from '@/components/indicator-selector';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="container flex-col content-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center p-12">Global Catastrophic Biohazard Risks Index</h1>
      <Map/>
    </main>
  )
}
