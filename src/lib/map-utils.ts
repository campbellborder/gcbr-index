import * as L from 'leaflet'
import * as chroma from 'chroma-js'

const colour_scale: (d: any) => chroma.Color = chroma.scale(['white', 'red']).domain([0,100])

function get_colour(d: any) {
    const colour: chroma.Color = colour_scale(d)
    return colour.hex()
}

function featureStyle(feature: any) {
    return {
        fillColor: (colour_scale(feature.properties.value)).hex(),
        fillOpacity: 0.7,
        weight: 1,
        color: 'white',
        opacity: 1
    };
}

function featureStyleDark(feature: any) {
    return {
        fillColor: (colour_scale(feature.properties.value)).hex(),
        fillOpacity: 0.7,
        weight: 1,
        color: '#020817',
        opacity: 1
    };
}

function highlightFeature(e: L.LeafletMouseEvent) {
    var feature = e.target;

    feature.setStyle({
        weight: 2,
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }

    return feature.feature;
}

function resetHighlight(e: L.LeafletMouseEvent) {
    var feature = e.target;

    feature.setStyle({
        weight: 1,
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToBack();
    }
}


export { featureStyle, featureStyleDark, highlightFeature, resetHighlight, colour_scale }