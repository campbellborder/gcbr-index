import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { KeyObject } from 'crypto';
let csvToJson = require('convert-csv-to-json')

export async function GET(
    request: Request,
    { params }: {params: {type : string} }
) {
    const type = params.type
    var jsonDirectory = path.join(process.cwd(), 'data');
    var jsonData = csvToJson.fieldDelimiter(',').getJsonFromCsv(jsonDirectory + "/gcbr_data.csv")
    const geoJsonString = await fs.readFile(jsonDirectory + '/countries-10.geojson', 'utf8');
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
        var geoObject = geoJsonData.features.find((object: any) => object.properties['iso-a3'] == data["iso-a3"])
        if (geoObject) {
            data['name'] = geoObject.properties['name'] 
        } else {
            console.log(`WARNING: missing geojson country with code ${data['iso-a3']}`)
        }
    })

    console.log(geoJsonData.features.length)
    
    return NextResponse.json(jsonData);
}

// Code for removing extra keys in og geojson and converting _ to -

//   const validKeys = ["iso_a3","continent","region_un","subregion","region_wb","name","name_long"]

//   geoJsonData.features.forEach((feature: any) => {
//     Object.keys(feature.properties).forEach((key) => validKeys.includes(key) || delete feature.properties[key]);
//   })
//   geoJsonData.features.forEach((feature: any) => {
//   Object.keys(feature.properties).forEach((key) => {
//     if (key.includes("_")) {
//         var new_key = key.replace("_", "-")
//         feature.properties[new_key] = feature.properties[key]
//         delete feature.properties[key]
//     }
//   });
// })

//   fs.writeFile(jsonDirectory + '/test.txt', JSON.stringify(geoJsonData))