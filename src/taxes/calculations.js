//const fed = require("../tax_data/federal.json")
//console.log(fed['2013']['rates'])

import { fed_data as fed, prov_data } from "./init"

const errors = {
  income_less_than_zero: "error, income cannot be less than zero"
}

function round_to(val, digits){
  if (digits < 0){
    return val
  }
  return Math.round(( val + Number.EPSILON) * 10**digits) / 10**digits
}

/**
 * Get all the plottable data!
 * 
 * @param {string} year: Tax year 
 * @param {Number} income: Taxable income for the year
 * @param {string} prov: Two digit provincial code capitalized ("AB", etc) 
 * @returns {object}
 * @returns {object} Twelve properties: Each property is an array of objects 
 *                   containing x and y properties}. Twleve property names:
 *                    'federal_income_tax',
 *                    'federal_income_tax_percentage',
 *                    'cpp',
 *                    'cpp_percentage', 
 *                    'prov_income_tax', 
 *                    'prov_income_tax_percentage',
 *                    'total_income_tax', 
 *                    'total_income_tax_percentage',
 *                    'total_tax',
 *                    'total_tax_percentage'
 */
const get_tax_data = (year, income, prov, x_interval) => {
  if (income <= 0){
    return {}
  }
  const fed_plots = _get_fed_plots(year, income, x_interval)
  const prov_plots = _get_prov_plots(year, income, prov, x_interval)

  let total_tax = []
  let total_tax_percentage = []
  let total_income_tax = []
  let total_income_tax_percentage = []
  let i = 0
  for (let x = 0; x <= income; x += x_interval, i++){
    let t_i_t = fed_plots.fed_income_tax[i]['y'] + prov_plots.prov_income_tax[i]['y']
    //t_i_t = round_to(t_i_t, 2)
    let t_t = t_i_t + fed_plots.cpp[i]['y'] + fed_plots.ei[i]['y']
    //t_t = round_to(t_t, 2)
    total_income_tax.push({'x':x, 'y': t_i_t})
    total_income_tax_percentage.push({'x': x, 'y': round_to(100 * t_i_t / x, 2)})
    total_tax.push({'x':x, 'y': t_t})
    total_tax_percentage.push({'x': x, 'y': round_to(100 * t_t / x, 2)})
  }

  return {...fed_plots, 
    ...prov_plots, 
    total_income_tax, 
    total_income_tax_percentage, 
    total_tax,
    total_tax_percentage
  }
}
// Total tax: 4369.25 17.48
// Total Income Tax: 2835 11.34

/**
 * Calculate all federal plottable tax data returned as arrays of objects
 * containing x and y properties.
 * 
 * @param {string} year: Tax year
 * @param {Number} income: Taxable Income for the year 
 * @returns {object} Four properties: 
 *   'fed_income_tax' {Array of objects contained x and y properties}
 *   'fed_income_tax_percentage' {Array of objects contained x and y properties}
 *   'cpp' {Array of objects contained x and y properties}
 *   'cpp_percentage' {Array of objects contained x and y properties}
 */
const _get_fed_plots = (year, income, x_interval) => {
  let fed_income_tax = []
  let fed_income_tax_percentage = []
  let cpp = []
  let cpp_percentage = []
  let ei = []
  let ei_percentage = []
  for (let i = 0; i <= income; i += x_interval){
    let inc_tax = calc_fed_income_tax(year, i) - calc_fed_bpa_credit(year, i)
    inc_tax = inc_tax > 0 ? inc_tax : 0
    fed_income_tax.push({'x': i, 'y': round_to(inc_tax,2)})
    cpp.push({'x': i, 'y': calc_fed_cpp(year, i)})
    ei.push({'x': i, 'y': calc_fed_ei(year, i)})
    ei_percentage.push({'x': i, 'y': round_to(100 * calc_fed_ei(year, i) / i, 2) })
    cpp_percentage.push({'x': i, 'y': round_to(100 * calc_fed_cpp(year, i) / i, 2) })
    fed_income_tax_percentage.push({'x': i, 'y': round_to(100 * inc_tax / i, 2) })
  }
  return {fed_income_tax, fed_income_tax_percentage, cpp, cpp_percentage, ei, ei_percentage}
}
// fed 2094.3 8.38
// cpp 1064.25 4.26
// ei 470 1.88

/**
 * Calculate all provincial plottable tax data (for given province), 
 * returned as arrays of objects containing x and y properties.
 * 
 * @param {string} year: Tax year
 * @param {Number} income: Taxable Income for the year 
 * @param {string} prov: Two digit provincial code capitalized ("AB", etc)
 * @returns {object} Two properties: 
 *  'prov_income_tax' {Array of objects contained x and y properties}
 *  'prov_income_tax_percentage' {Array of objects contained x and y properties}
 */
const _get_prov_plots = (year, income, prov, x_interval) => {
  let prov_income_tax = []
  let prov_income_tax_percentage = []
  const x_inc = income / 16
  for (let i = 0; i <= income; i += x_interval){
    let inc_tax = calc_prov_income_tax(year, i, prov) - calc_prov_bpa_credit(year, i, prov)
    inc_tax = inc_tax > 0 ? inc_tax : 0
    prov_income_tax.push({'x': i, 'y': round_to(inc_tax,2)})
    prov_income_tax_percentage.push({'x': i, 'y': round_to(100 * inc_tax / i, 4)})
  }
  return {prov_income_tax, prov_income_tax_percentage}
}
// $25000, 740.7, 2.96

/** 
 * Standard marginal progressive tax calculation. The amount of income in each
 * tax bracket is multiplied by the tax rate for that bracket. 

 * @param {array} rate_info: array of objects. Each object has "rate" and 
 *                           "min_bracket" properties. Both are numbers.
 * @param {Number} income: Total income of individual
 * @return {Number} The total income tax owed
*/
const _calc_basic_income_tax = (rate_info, income) => {
  let i = 1
  let taxable = 0
  let brackets = rate_info.map((bracket) => {return bracket['min_bracket']})
  let taxables = [] // store taxable income in each tax bracket

  // calc taxable portions of income in each tax bracket
  for (let i = 1; i < brackets.length; i++){
    if (income > brackets[i-1]){
      taxable = Math.min(income - brackets[i-1], 
        brackets[i] - brackets[i-1])
    } else {
      taxable = 0
    }
    taxables.push(taxable)
  }
  
  // calc last tax bracket
  taxable = Math.max(income - brackets[brackets.length - 1], 0)
  taxables.push(taxable)

  let rates = rate_info.map((bracket) => bracket['rate'] / 100)
  let taxes = []
  // calc taxes owed per tax bracket
  for (let i = 0; i < taxables.length; i++){
    taxes.push(taxables[i] * rates[i])
  }

  // Total taxes owed (for all tax brackets combined)
  let tax_amnt = taxes.reduce((accum, cur) => accum + cur, 0)
  tax_amnt = round_to(tax_amnt, 2)
  return (tax_amnt < 0) ? 0: tax_amnt

}

/**
 * Calculate total provincial income tax owed based on given province, income, 
 * and year
 *
 * @param {string} year: The tax year
 * @param {Number} income: Individual income earned for the year
 * @param {string} prov: Two digit provincial code capitalized ("AB", etc)
 * @return {Number} The total income tax owed
*/
const calc_prov_income_tax = (year, income, prov) => {
  if (income < 0) {
    throw Error(errors.income_less_than_zero)
  }
  return _calc_basic_income_tax(prov_data[prov][year]['rates'], income)
}

/**
 * Calculate total federal income tax owed based on given income, and year
 *
 * @param {string} year: The tax year
 * @param {Number} income: Individual income earned for the year
 * @return {Number} The total income tax owed
*/
const calc_fed_income_tax = (year, income) => {
  if (income < 0) {
    throw Error(errors.income_less_than_zero)
  }
  return _calc_basic_income_tax(fed[year]['rates'], income)
}

/**
 * Calculate non-refundable tax credit from the basic personal amount. Here we
 * simply multiple personal amount by the tax rate of teh lowest tax bracket.
 * 
 * @param {object} year_info: Must have at least two properties: 
 *                            'personal_amount' (Number) and 'rates' (array of
 *                            objects). Each rate object has 'rate' (Number) and
 *                            'min_bracket' (Number) properties
 * @param {Number} income: Earned income for the year
 * @returns {Number} Total non-refundable tax credit for basic personal amount
 */
const _calc_base_bpa_credit = (year_info, income) => {
  let bpa = year_info['personal_amount']
  let rate = year_info['rates']
  rate = rate[0].rate / 100
  return round_to(bpa * rate, 2)
}

/**
 * Calculate provincial non-refundable tax credit for given province, year, and 
 * income.
 * 
 * @param {string} year: Tax year 
 * @param {Number} income: Total taxable income of the year 
 * @param {string} prov: Two digit provincial code capitalized ("AB", etc)
 * @returns {Number} Total non-refundable tax credit for basic personal amount
 */
const calc_prov_bpa_credit = (year, income, prov) => {
  if (income < 0){
    throw new Error(errors.income_less_than_zero)
  }
  return _calc_base_bpa_credit(prov_data[prov][year], income)
}

/**
 * 
 * Calculate federal non-refundable tax credit from Basic Personal Amount (BPA). 
 * Credit is found by multiplying BPA by the tax rate of the lowest tax bracket.
 * Note: Things changed after 2020.. Calculation is the same but determining
 *         BPA is a bit more complicated once income surpasses a certain value.
 *         Check Notes document for more details.
 * 
 * @param {string} year: Tax year
 * @param {Number} income: Total taxable income for the tax year 
 * @return {Number} Non-refundable Basic Personal Amount tax credit for the year.
 */
const calc_fed_bpa_credit = (year, income) => {
  if (income < 0){
    throw new Error(errors.income_less_than_zero)
  }
  let bpa = 0
  if (Number(year) < 2020){
    bpa = fed[year]['personal_amount'] 
  } else {
    let lower = fed[year]['rates'][3]['min_bracket']
    let higher = fed[year]['rates'][4]['min_bracket']
    let bpa_high = fed[year]['personal_amount'][1]
    let bpa_low = fed[year]['personal_amount'][0]
    if (income <= lower){
      bpa = bpa_high
    }
    else if (income > higher){
      bpa = bpa_low
    }
    else {
      let decrement = (bpa_high - bpa_low) / (higher - lower)
      let dec_amount = (income - lower) * decrement
      bpa = bpa_high - dec_amount
    }
  }
  let rate = fed[year]['rates']
  rate = rate[0].rate / 100
  return round_to(bpa * rate, 2)
}

/**
 * Calculate Canadian Pension Plan (CPP) contribution for the year and income
 * 
 * @param {string} year: Tax year 
 * @param {Number} income: Taxable income for the year 
 * @returns {Number} CPP contribution for the year  
 */
const calc_fed_cpp = (year, income) => {
  if (income < 0){
    throw Error(errors.income_less_than_zero)
  }
  const cpp_info = fed[year]['cpp']

  income = income - cpp_info.exemption
  if (income < 0){
    income = 0
  }

  let contrib = income * (cpp_info['rate'] / 100)
  if (contrib > cpp_info.max_contrib){
    return cpp_info.max_contrib
  }
  return round_to(contrib, 2)
}

/**
 * Calculate federal Employment Insurance (EI) premium for the year and income.
 * 
 * @param {string} year: Tax year
 * @param {Number} income: Total taxable income for the year.
 * @returns {Number} Ei premium owed for the year and income provided.
 */
const calc_fed_ei = (year, income) => {
  if (income < 0){
    throw Error(errors.income_less_than_zero)
  }
  const rate = fed[year]['ei'].rate
  const max_premium = fed[year]['ei'].max_premium
  let premium = income * (rate / 100)
  return premium < max_premium ? round_to(premium, 2) : round_to(max_premium, 2)
}

export default {
  calc_fed_income_tax, 
  calc_prov_income_tax,
  calc_fed_bpa_credit, 
  calc_prov_bpa_credit,
  calc_fed_ei, 
  calc_fed_cpp,
  get_tax_data,
  round_to,
  errors
}