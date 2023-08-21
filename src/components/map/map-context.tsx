import { createContext } from "react";
import { Indicator, indicators } from "@/lib/indicators";

interface MapData {
  indicator: Indicator,
  setIndicator: any,
  focusedFeature: any,
  setFocusedFeature: any
}

const defaultMapData: MapData = {
  indicator: indicators[0],
  setIndicator: () => {},
  focusedFeature: null,
  setFocusedFeature: () => {}
}

export const MapContext = createContext(defaultMapData);