import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  //Find the absolute path of the file and read
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/countries.geojson', 'utf8');
  //Return the content of the data file in json format
  return NextResponse.json(fileContents);
}