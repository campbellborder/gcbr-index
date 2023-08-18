export type Indicator = {
    value: string,
    label: string,
    category: string
}

export const indicators: Indicator[] = [
    {
      value: "gcbr-index",
      label: "GCBR Index",
      category: "top"
    },
    {
      value: "lab-leak",
      label: "Lab leak",
      category: "top"
    },
    {
      value: "zoonotic",
      label: "Zoonotic",
      category: "top"
    },
    {
      value: "bioweapons",
      label: "Bioweapons",
      category: "top"
    },
    {
      value: "1.1",
      label: "1.1 Zoonotic spillover risk",
      category: "zoonotic-risk-burden"
    }
  ]
