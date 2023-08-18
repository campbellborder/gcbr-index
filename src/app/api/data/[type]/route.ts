import { NextResponse } from 'next/server';
import path from 'path';
let csvToJson = require('convert-csv-to-json')

export async function GET(
    request: Request,
    { params }: {params: {type : string} }
) {
    const type = params.type
    const jsonDirectory = path.join(process.cwd(), 'data');
    var jsonData = csvToJson.fieldDelimiter(',').getJsonFromCsv(jsonDirectory + "/dummy_data.csv")

    const keys = Object.keys(jsonData[0])
    if (type == "all") {
        var validKeys = keys
    } else if (type == "scores") {
        return NextResponse.json(keys.filter((key) => key != "country-code"))
    } else {
        var validKeys = ["country-code", type]
    }
    jsonData.forEach((data: any) => {
        Object.keys(data).forEach((key) => validKeys.includes(key) || delete data[key]);
    })
    
    return NextResponse.json(jsonData);
}