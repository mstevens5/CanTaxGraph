import ab_data from "./tax_data/ab.json" with { type: "json"}
import fed from "./tax_data/federal.json" with { type: "json"};


export const fed_data = fed

export const prov_data = {
  "AB": ab_data
}

export const provinces = Object.keys(prov_data)

export const years = Object.keys(fed_data)