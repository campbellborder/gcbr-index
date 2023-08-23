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
    category: "gcbr-index"
  },
  {
    value: "lab-leak-risk-burden",
    label: "Lab leak risk burden",
    category: "lab-leak"
  },
  {
    value: "lab-leak-1.1",
    label: "1.1- Number of laboratories",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-1.2",
    label: "1.2- Size of laboratories",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-1.3",
    label: "1.3- Laboratories in urban centres",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-2.1",
    label: "2.1- Research projects between 2016-2023",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-mitigating-countermeasures",
    label: "Lab leak mitigating countermeasures",
    category: "lab-leak"
  },
  {
    value: "lab-leak-3.1",
    label: "3.1- Whole-of-government biosecurity systems",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "lab-leak-3.2",
    label: "3.2- Biosecurity training and practices",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "lab-leak-3.3",
    label: "3.3- Personnel vetting: regulating access to sensitive locations",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "lab-leak-3.4",
    label: "3.4- Transportation security",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "lab-leak-3.5",
    label: "3.5- Cross-border transfer and end-user screening",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "lab-leak-4.1",
    label: "4.1- Whole-of-government biosafety systems",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "lab-leak-4.2",
    label: "4.2- Biosafety training and practices",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "lab-leak-5.1",
    label: "5.1- Oversight of dual-use research",
    category: "lab-leak-mitigating-countermeasures"
  },
  {
    value: "zoonotic",
    label: "Zoonotic",
    category: "gcbr-index"
  },
  {
    value: "zoonotic-risk-burden",
    label: "Zoonotic risk burden",
    category: "top"
  },
  {
    value: "zoonotic-1.1",
    label: "1.1- Global hotspots for zoonotic events",
    category: "zoonotic-risk-burden"
  },
  {
    value: "zoonotic-1.2",
    label: "1.2- Incidence of high-risk viral species",
    category: "zoonotic-risk-burden"
  },
  {
    value: "zoonotic-mitigating-countermeasures",
    label: "Zoonotic mitigating countermeasures",
    category: "zoonotic"
  },
  {
    value: "zoonotic-2.1",
    label: "2.1- National planning for zoonotic diseases/pathogens",
    category: "zoonotic-mitigating-countermeasures"
  },
  {
    value: "zoonotic-2.3",
    label: "2.3- IHR capacity score for Zoonosis",
    category: "zoonotic-mitigating-countermeasures"
  },
  {
    value: "zoonotic-3.1",
    label: "3.1- Farmed animal health infrastructure",
    category: "zoonotic-mitigating-countermeasures"
  },
  {
    value: "zoonotic-3.2",
    label: "3.2- Surveillance systems for zoonotic diseases/pathogens",
    category: "zoonotic-mitigating-countermeasures"
  },
  {
    value: "zoonotic-3.3",
    label: "3.3- Wildlife trade and conflict",
    category: "zoonotic-mitigating-countermeasures"
  }
]
