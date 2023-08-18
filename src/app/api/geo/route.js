import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  //Find the absolute path of the file and read
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/countries.geojson', 'utf8');

  //Return the content of the data file in json format
  return NextResponse.json(JSON.parse(fileContents));
}

// DELETE:

// Code for removing extra keys in og geojson and converting _ to -

//   const validKeys = ["iso_a3","continent","region_un","subregion","region_wb","name_ar","name_bn","name_de","name_en","name_es","name_fa","name_fr","name_el","name_he","name_hi","name_hu","name_id","name_it","name_ja","name_ko","name_nl","name_pl","name_pt","name_ru","name_sv","name_tr","name_uk","name_ur","name_vi","name_zh","name_zht"]

//   const object = JSON.parse(fileContents)
//   object.features.forEach((feature) => {
//     Object.keys(feature.properties).forEach((key) => validKeys.includes(key) || delete feature.properties[key]);
//   })
// object.features.forEach((feature) => {
//   Object.keys(feature.properties).forEach((key) => {
//     var new_key = key.replace("_", "-")
//     feature.properties[new_key] = feature.properties[key]
//     delete feature.properties[key]
//   });
// })

//   fs.writeFile("test.txt", JSON.stringify(object), function(err) {
//     if (err) {
//         console.log(err);
//     }
// });