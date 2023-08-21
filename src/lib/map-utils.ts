import * as L from 'leaflet'
import chroma from 'chroma-js'

const colour_scale: (d: any) => chroma.Color = chroma.scale(['white', 'red']).domain([0,100]).padding([0.1, 0])

function featureStyle(feature: any) {
    return {
        fillColor: (colour_scale(feature.properties.value)).hex(),
        fillOpacity: 1,
        weight: 1,
        color: 'white',
        opacity: 1
    };
}

function featureStyleDark(feature: any) {
    return {
        fillColor: (colour_scale(feature.properties.value)).hex(),
        fillOpacity: 1,
        weight: 1,
        color: '#020817',
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


export { featureStyle, featureStyleDark, highlightFeature, resetHighlight, colour_scale }