import ab_data from "./tax_data/ab.json" with { type: "json"}
import bc_data from "./tax_data/bc.json" with { type: "json"}
import sk_data from "./tax_data/sk.json" with { type: "json"}
import mb_data from "./tax_data/mb.json" with { type: "json"}
import on_data from "./tax_data/on.json" with { type: "json"}
import nl_data from "./tax_data/nl.json" with { type: "json"}
import pe_data from "./tax_data/pe.json" with { type: "json"}
import ns_data from "./tax_data/ns.json" with { type: "json"}
import fed from "./tax_data/federal.json" with { type: "json"};


export function get_fed_details(year){
  return JSON.parse(JSON.stringify(fed[year]))
}

export const fed_data = fed

export const prov_data = {
  "BC": bc_data,
  "AB": ab_data,
  "SK": sk_data,
  "MB": mb_data,
  "ON": on_data,
  "NL": nl_data,
  "PE": pe_data,
  "NS": ns_data
}

export const provinces = Object.keys(prov_data)

export const years = Object.keys(fed_data)