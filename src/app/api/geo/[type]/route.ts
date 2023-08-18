import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
let csvToJson = require('convert-csv-to-json')

export async function GET(
    request: Request,
    { params }: {params: {type : string} }
) {
    const type = params.type
    const jsonDirectory = path.join(process.cwd(), 'data');
    var jsonData = csvToJson.fieldDelimiter(',').getJsonFromCsv(jsonDirectory + "/dummy_data.csv")
    const geoJsonString = await fs.readFile(jsonDirectory + '/countries.geojson', 'utf8');
    var geoJsonData = JSON.parse(geoJsonString)

    const keys = Object.keys(jsonData[0])
    if (type == "all") {
        var validKeys = keys
    } else if (type == "scores") {
        return NextResponse.json(keys.filter((key) => key != "iso-a3"))
    } else {
        var validKeys = ["iso-a3", type]
    }
    jsonData.forEach((data: any) => {
        Object.keys(data).forEach((key) => validKeys.includes(key) || delete data[key]);
        var feature = geoJsonData.features.find((feature1: any) => feature1.properties['iso-a3'] == data['iso-a3'])
        if (feature) {
            Object.keys(data).forEach((key) => feature.properties.value = data[key])
        }
    })
    
    // TODO: Handle geojson objects that arent present in dummy data/data
    
    return NextResponse.json(geoJsonData);
}