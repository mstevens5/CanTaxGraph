let data = require("../data/ab.json")
let fed = require("../data/federal.json")
console.log(JSON.stringify(fed,null,2))

const keys = Object.keys(data)
console.log(keys)

const personals = {
  2013: 17593,
  2014: 17787,
  2015: 18214,
  2016: 18451,
  2017: 18690,
  2018: 18915,
  2019: 19369,
  2020: 19369,
  2021: 19369,
  2022: 19814,
  2023: 21003,
  2024: 21885
}

let newData = {}
keys.forEach((year) => {
  newData[year] = {
    'personalAmount': personals[year], 
    'rates': data[year] }
})

//console.log(JSON.stringify(newData,null,2))

const fs = require('node:fs')

/*
fs.writeFile('./out.json', JSON.stringify(newData, null, 2), (err)=>{
  if (err) throw err;
  console.log('The file has been saved');
});
*/