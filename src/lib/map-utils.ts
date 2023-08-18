import * as geojson from 'geojson'
import * as L from 'leaflet'

function getColor(d: any) {
    return d > 90  ? '#b10026' :
           d > 75  ? '#e31a1c' :
           d > 70  ? '#fc4e2a' :
           d > 30  ? '#fd8d3c' :
           d > 20  ? '#feb24c' :
           d > 10  ? '#fed976' :
           d > 5   ? '#ffeda0' :
                     '#ffffcc';
}



function featureStyle(feature: any) {
    return {
        fillColor: getColor(feature.properties.value),
        fillOpacity: 0.7,
        weight: 1,
        opacity: 1,
        color: 'white',
    };
}

function highlightFeature(e: L.LeafletMouseEvent) {
    var feature = e.target;

    feature.setStyle({
        weight: 4,
        color: '#666',
        fillOpacity: 0.
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}

function resetHighlight(e: L.LeafletMouseEvent) {
    var feature = e.target;

    feature.setStyle({
        weight: 1,
        color: 'white',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToBack();
    }
}

function onEachFeature(feature: geojson.Feature<geojson.Geometry, any>, layer: L.Layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    })
}

export { featureStyle, onEachFeature }