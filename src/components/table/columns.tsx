'use client'

import { ColumnDef } from "@tanstack/react-table"
import { indicators } from "@/lib/indicators"

const keysList = indicators.map((indicator) => indicator.value).concat(['iso-a3'])
type Keys = typeof keysList[number];

export type Data = {
  [K in Keys]: string;
};

export const indicatorColumns: ColumnDef<Data>[] = indicators.map((indicator) => ({
  accessorKey: indicator.value,
  //header:indicator.label,
  header: ({ column }) => {
    return <div className="text-center font-bold">{indicator.label}</div>
  },
  cell: ({ row }) => {
    var valueString: string = row.getValue(indicator.value)
    var value = parseFloat(valueString)

    return <div className="text-center font-medium">{valueString}</div>
  }
}))

export const columns = [
  {
    accessorKey: 'iso-a3',
    header: "ISO code"
  },
  {
    accessorKey: 'name',
    header: "Country"
  },
  ...indicatorColumns
]