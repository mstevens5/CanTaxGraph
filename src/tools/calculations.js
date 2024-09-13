const fed = require("../tax_data/federal.json")
console.log(fed['2013']['rates'])

const calc_fed_income_tax = (year, income, fed) => {
  let i = 1
  let taxable = 0
  let brackets = fed[year]['rates'].map((bracket) => {return bracket['min_bracket']})
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

  let rates = fed[year]['rates'].map((bracket) => bracket['rate'] / 100)
  let taxes = []
  // calc taxes owed per tax bracket
  for (let i = 0; i < taxables.length; i++){
    taxes.push(taxables[i] * rates[i])
  }

  // Total taxes owed (for all tax brackets combined)
  return taxes.reduce((accum, cur) => accum + cur, 0)
}

/*
year: string
income: Number
fed: JSON object

Calculate non-refundable tax credit from Basic Personal Amount (BPA). Credit
is found by multiplying BPA by the tax rate of the lowest tax bracket.
** Note: Things changed after 2020.. Calculation is the same but determining
         BPA is a bit more complicated once income surpasses a certain value.
         Check Notes document for more details
*/
const calc_bpa_credit = (year, income, fed) => {
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
  return bpa * rate
}

const calc_fed_cpp = (year, income, fed) => {
  const cpp_info = fed[year]['cpp']

  income = income - cpp_info.exemption
  if (income < 0){
    income = 0
  }

  let contrib = income * (cpp_info['rate'] / 100)
  if (contrib > cpp_info.max_contrib){
    return cpp_info.max_contrib
  }
  return contrib
}

const calc_fed_ei = (year, income, fed) => {
  const rate = fed[year]['ei'].rate
  const max_premium = fed[year]['ei'].max_premium
  let premium = income * (rate / 100)
  return premium < max_premium ? premium : max_premium
}

for (let i = 0; i <= 300000; i = i + 50000){
  console.log(calc_fed_income_tax('2013', i, fed))
}
console.log(fed['2013']['rates'])

console.log(calc_fed_income_tax('2021', 10000, fed))

console.log(calc_bpa_credit('2021', 10000, fed))

console.log('')
console.log(calc_fed_cpp('2021', 30000, fed))
console.log(calc_fed_cpp('2021', 60000, fed))
console.log(calc_fed_cpp('2021', 80000, fed))
console.log(calc_fed_cpp('2021', 800000, fed))

console.log('')
console.log(calc_fed_ei('2021', 10000, fed))
console.log(calc_fed_ei('2021', 20000, fed))
console.log(calc_fed_ei('2021', 30000, fed))
console.log(calc_fed_ei('2021', 40000, fed))
console.log(calc_fed_ei('2021', 50000, fed))
console.log(calc_fed_ei('2021', 60000, fed))