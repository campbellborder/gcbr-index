import * as L from 'leaflet'
import chroma from 'chroma-js'

const colour_scale: (d: any) => chroma.Color = chroma.scale(['white', 'red']).domain([0,100]).padding([0.1, 0])

function featureStyle(feature: any, colourKey: string, theme: string) {
    console.log("instyle")
    return {
        fillColor: (colour_scale(feature.properties[colourKey])).hex(),
        fillOpacity: 1,
        weight: 1,
        color: theme == "light" ? 'white' : '#020817',
        opacity: 1
    };
}

function featureStyleOG(feature: any) {
    console.log("instyleOG")
    return {
        fillColor: (colour_scale(feature.properties['gcbr-index'])).hex(),
        fillOpacity: 1,
        weight: 1,
        color: "light" == "light" ? 'white' : '#020817',
        opacity: 1
    };
}

function highlightFeature(layer: any) {
    console.log("highlight feature")
    layer.setStyle({
        weight: 2,
        fillOpacity: 0.7
    });

    return layer.feature;
}

function resetHighlight(layer: L.Layer, geojson: L.GeoJSON) {
    console.log("reset highlight")
    geojson.resetStyle(layer)
}


export { featureStyle, featureStyleOG, highlightFeature, resetHighlight, colour_scale }