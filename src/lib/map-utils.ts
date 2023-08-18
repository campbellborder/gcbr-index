import * as geojson from 'geojson'
import * as L from 'leaflet'

function featureStyle(feature: any) {
    return {
        fillColor: 'slate',
        fillOpacity: 1,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3'
    };
}

function highlightFeature(e: L.LeafletMouseEvent) {
    var feature = e.target;

    feature.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.1
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
        dashArray: '',
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