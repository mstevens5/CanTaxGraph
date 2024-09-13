import ab_data from "./ab.json"
import fed from "./federal.json"


export const fed_data = fed

export const prov_data = {
  "AB": ab_data
}

export const provinces = Object.keys(prov_data)

export const years = Object.keys(fed_data)