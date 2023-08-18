import { NextResponse } from 'next/server';
import path from 'path';
let csvToJson = require('convert-csv-to-json')

export async function GET(
    request: Request,
    { params }: {params: {type : string} }
) {
    const type = params.type
    const jsonDirectory = path.join(process.cwd(), 'data');
    const json = csvToJson.getJsonFromCsv(jsonDirectory + "/dummy_data.csv")
    const keys = Object.keys(json[0])
    return NextResponse.json(type);
}