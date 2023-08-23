import * as L from 'leaflet'
import chroma from 'chroma-js'
import { Indicator } from './indicators'

const burden_colour_scale: (d: any) => chroma.Color = chroma.scale(['white', 'red']).domain([0,100]).padding([0.2, 0])
const mitigation_colour_scale: (d: any) => chroma.Color = chroma.scale(['white', 'green']).domain([0,100]).padding([0.2, 0])

function featureStyle(feature: any, indicator: Indicator, theme: string) {

    var mitigating_value = indicator.value.includes("mitigating")
    var mitigating_category = indicator.category.includes("mitigating")
    var scale = (mitigating_value || mitigating_category ? mitigation_colour_scale : burden_colour_scale)
    var scalar = (mitigating_value ? 100 : 1)

    return {
        fillColor: (scale(feature.properties[indicator.value] * scalar)).hex(),
        fillOpacity: 1,
        weight: 1,
        color: theme == "light" ? 'white' : '#020817',
        opacity: 1
    };
}


function highlightFeature(layer: any) {
    layer.setStyle({
        weight: 2,
        fillOpacity: 0.7
    });

    return layer.feature;
}

function resetHighlight(layer: L.Layer, geojson: L.GeoJSON) {
    geojson.resetStyle(layer)
}


export { featureStyle, highlightFeature, resetHighlight, burden_colour_scale, mitigation_colour_scale }