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
    value: "zoonotic-1.1",
    label: "Global hotspots for zoonotic events",
    category: "zoonotic-risk-burden"
  },
  {
    value: "zoonotic-1.2",
    label: "Incidence of high-risk viral species",
    category: "zoonotic-risk-burden"
  },
  {
    value: "zoonotic-2.1",
    label: "National planning for zoonotic diseases/pathogens",
    category: "zoonotic-risk-mitigation"
  },
  {
    value: "zoonotic-2.3",
    label: "IHR capacity score for Zoonosis",
    category: "zoonotic-risk-mitigation"
  },
  {
    value: "zoonotic-3.1",
    label: "Farmed animal health infrastructure",
    category: "zoonotic-risk-mitigation"
  },
  {
    value: "zoonotic-3.2",
    label: "Surveillance systems for zoonotic diseases/pathogens",
    category: "zoonotic-risk-mitigation"
  },
  {
    value: "zoonotic-3.3",
    label: "Wildlife trade and conflict",
    category: "zoonotic-risk-mitigation"
  },
  {
    value: "lab-leak-1.1",
    label: "Number of laboratories",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-1.2",
    label: "Size of laboratories",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-1.3",
    label: "Laboratories in urban centres",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-2.1",
    label: "Research projects between 2016-2023",
    category: "lab-leak-risk-burden"
  },
  {
    value: "lab-leak-3.1",
    label: "Whole-of-government biosecurity systems",
    category: "lab-leak-risk-mitigation"
  },
  {
    value: "lab-leak-3.2",
    label: "Biosecurity training and practices",
    category: "lab-leak-risk-mitigation"
  },
  {
    value: "lab-leak-3.3",
    label: "Personnel vetting: regulating access to sensitive locations",
    category: "lab-leak-risk-mitigation"
  },
  {
    value: "lab-leak-3.4",
    label: "Transportation security",
    category: "lab-leak-risk-mitigation"
  },
  {
    value: "lab-leak-3.5",
    label: "Cross-border transfer and end-user screening",
    category: "lab-leak-risk-mitigation"
  },
  {
    value: "lab-leak-4.1",
    label: "Whole-of-government biosafety systems",
    category: "lab-leak-risk-mitigation"
  },
  {
    value: "lab-leak-4.2",
    label: "Biosafety training and practices",
    category: "lab-leak-risk-mitigation"
  },
  {
    value: "lab-leak-5.1",
    label: "Oversight of dual-use research",
    category: "lab-leak-risk-mitigation"
  }
]
