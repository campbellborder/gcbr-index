'use client'

import { ColumnDef } from "@tanstack/react-table"
import { indicators } from "@/lib/indicators"

const keysList = indicators.map((indicator) => indicator.value).concat(['iso-a3'])
type Keys = typeof keysList[number]; // 'key1' | 'key2' | 'key3'

export type Data = {
    [K in Keys]: string;  // or any other type
};

export const indicatorColumns: ColumnDef<Data>[] = indicators.map((indicator) => ({
  accessorKey: indicator.value,
  header: indicator.label
}))

export const columns = [
  {
    accessorKey: 'iso-a3',
    header: "Country code"
  }, ...indicatorColumns
]