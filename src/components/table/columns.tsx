'use client'

import { ColumnDef } from "@tanstack/react-table"
import { indicators } from "@/lib/indicators"

const keysList = indicators.map((indicator) => indicator.value).concat(['iso-a3', 'name'])
type Keys = typeof keysList[number];

export type Data = {
  [K in Keys]: string;
};

export const indicatorColumns: ColumnDef<Data>[] = indicators.map((indicator) => ({
  accessorKey: indicator.value,
  header: ({ column }) => {
    return <div className="text-center font-bold">{indicator.label}</div>
  },
  cell: ({ row }) => {
    var value: number = row.getValue(indicator.value)
    var formatted = value.toFixed(2)
    return <div className="text-center font-medium">{formatted}</div>
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
  { accessorKey: 'rank',
    header: 'Rank'
  },
  ...indicatorColumns
]