import calc from "../taxes/calculations"

test('testing calc_fed_income_tax', () => {
  // YEAR 2013: *********
  let incomes = [
    0, 42000, 43600, 70000, 90000, 135000, 200000
  ]
  let expected = [
    0, 6300, 6542.73, 12350.73, 16865.81, 28565.81, 47414.19
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2013, income: ${incomes[i]}`)
    expect(calc.calc_fed_income_tax('2013', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_income_tax('2013', -50);})
    .toThrow(calc.errors.income_less_than_zero)

  console.log('')

  // YEAR 2019: *********
  incomes = [
    0, 42000, 50000, 70000, 100000, 135000, 200000, 300000
  ]
  expected = [
    0, 6300, 7630.35, 11730.35, 18141.11, 27241.11, 45711.10, 78296.26
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2019, income: ${incomes[i]}`)
    expect(calc.calc_fed_income_tax('2019', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_income_tax('2019', -50);})
    .toThrow(calc.errors.income_less_than_zero)
})

test('testing calc_fed_ei', () => {
  // YEAR 2021: *********
  let incomes = [
    0, 1500, 20000, 45879, 56300, 80000
  ]
  let expected = [
    0, 20.15, 268.6, 616.15, 756.11, 756.11
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2021, income: ${incomes[i]}`)
    expect(calc.calc_fed_ei('2021', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_ei('2021', -50);})
    .toThrow(calc.errors.income_less_than_zero)

  console.log('')

  // YEAR 2024: *********
  incomes = [
    0, 1500, 20000, 45879, 63200, 80000
  ]
  expected = [
    0, 21.17, 282.2, 647.35, 891.75, 891.75
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2024, income: ${incomes[i]}`)
    expect(calc.calc_fed_ei('2024', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_ei('2024', -50);})
    .toThrow(calc.errors.income_less_than_zero)
})

test('testing calc_fed_cpp', () => {
  // YEAR 2023: *********
  let incomes = [
    3500, 1500, 0, 4000, 10000, 15789, 40000, 62789, 66600, 80000
  ]
  let expected = [
    0, 0, 0, 25.29, 328.74, 621.52, 1845.99, 2998.54, 3191.28, 3191.28
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2023, income: ${incomes[i]}`)
    expect(calc.calc_fed_cpp('2023', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_cpp('2023', -50);})
    .toThrow(calc.errors.income_less_than_zero)

  console.log('')

  // YEAR 2022: *********
  incomes = [
    3500, 1500, 0, 4000, 10000, 15789, 40000, 61400, 64900, 80000
  ]
  expected = [
    0, 0, 0, 24.23, 314.93, 595.40, 1768.43, 2805.26, 2974.83, 2974.83
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2022, income: ${incomes[i]}`)
    expect(calc.calc_fed_cpp('2022', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_cpp('2022', -50);})
    .toThrow(calc.errors.income_less_than_zero)
})

test('testing calc_fed_bpa_credit()', () => {
  // YEAR 2021: ********
  let incomes = [
    190000, 155000, 214000, 170000, 0, 
    50000, 100000, 150473, 214368, 275000, 5000000
  ]
  let expected = [
    1897.96, 1974.46, 1845.50, 1941.67, 1984.35,
    1984.35, 1984.35, 1984.35, 1844.7, 1844.7, 1844.7
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2020, income: ${incomes[i]}`)
    expect(calc.calc_fed_bpa_credit('2020', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_bpa_credit('2020', -1);})
    .toThrow(calc.errors.income_less_than_zero)

  console.log('')

  // YEAR 2023 ****************
  incomes = [
    190000, 166000, 227654, 170000, 0, 
    50000, 100000, 165430, 235675, 275000, 5000000
  ]
  expected = [
    2172.35, 2248.20, 2053.35, 2235.56,
    2250,2250,2250,2250,2028,2028,2028
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2023, income: ${incomes[i]}`)
    expect(calc.calc_fed_bpa_credit('2023', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_bpa_credit('2023', -1);})
    .toThrow(calc.errors.income_less_than_zero)
})

test('testing calc_prov_bpa_credit() for AB', () => {
  // YEAR 2014: ********
  let incomes = [
    0, 7874, 12000, 18000, 40000, 100000
  ]
  let expected = [
    1778.7, 1778.7, 1778.7, 1778.7, 1778.7, 1778.7
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2014, income: ${incomes[i]}`)
    expect(calc.calc_prov_bpa_credit('2014', incomes[i], 'AB')).toBe(expected[i])
  }
  expect(() => {calc.calc_prov_bpa_credit('2014', -1, 'AB');})
    .toThrow(calc.errors.income_less_than_zero)

  console.log('')
})

test('testing calc_prov_income_tax for AB', () => {
  // YEAR 2014: *********
  let incomes = [
    0, 7000, 30000, 100000, 200000
  ]
  let expected = [
    0, 700, 3000, 10000, 20000
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2014, income: ${incomes[i]}`)
    expect(calc.calc_prov_income_tax('2014', incomes[i], 'AB')).toBe(expected[i])
  }
  expect(() => {calc.calc_prov_income_tax('2014', -50, 'AB');})
    .toThrow(calc.errors.income_less_than_zero)

  console.log('')

  // YEAR 2019: *********
  incomes = [
    0, 42000, 50000, 70000, 100000, 135000, 200000, 300000
  ]
  expected = [
    0, 6300, 7630.35, 11730.35, 18141.11, 27241.11, 45711.10, 78296.26
  ]
  for (let i = 0; i < incomes.length; i++){
    console.log(`Testing year 2019, income: ${incomes[i]}`)
    expect(calc.calc_fed_income_tax('2019', incomes[i])).toBe(expected[i])
  }
  expect(() => {calc.calc_fed_income_tax('2019', -50);})
    .toThrow(calc.errors.income_less_than_zero)
})