'use client'

import { useState, createContext } from "react";
import { Indicator, indicators } from "@/lib/indicators";

export const IndicatorContext = createContext<Indicator>(indicators[0]);
export const SetIndicatorContext = createContext<any>(() => {});
export const FocusedFeatureContext = createContext<any>(null);
export const SetFocusedFeatureContext = createContext<any>(() => {});

export default function MapContextProvider({children}: {children: any}) {

  const [indicator, setIndicator] = useState(indicators[0])
  const [focusedFeature, setFocusedFeature] = useState(null)

  return (
    <IndicatorContext.Provider value={indicator}>
      <SetIndicatorContext.Provider value={setIndicator}>
      <FocusedFeatureContext.Provider value={focusedFeature}>
        <SetFocusedFeatureContext.Provider value={setFocusedFeature}>
        {children}
        </SetFocusedFeatureContext.Provider>
      </FocusedFeatureContext.Provider>
      </SetIndicatorContext.Provider>
    </IndicatorContext.Provider>
  )
}