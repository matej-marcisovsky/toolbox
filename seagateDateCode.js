#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

function isShortCode(dateCode) {
  return dateCode.length === 4;
}

function addDays(date, days) {
  date.setDate(date.getDate() + days);
}

const argv = yargs(hideBin(process.argv))
  .command('* <dateCode>', 'Convert Seagate date code to date.', (yargs) => {
    yargs.positional('dateCode', {
      demandOption: true,
      describe: 'Seagate date code.',
      type: 'string'
    })
  })
  .help()
  .alias('help', 'h')
  .argv;

const { dateCode } = argv;

const year = Number(dateCode.slice(0, 2)) + 1999;
const weeks = Number(dateCode.slice(2, isShortCode(dateCode) ? 3 : 4)) - 1;
const days = Number(dateCode.slice(isShortCode(dateCode) ? 3 : 4)) - 1;

const date = new Date();

date.setFullYear(year);
date.setMonth(6);
date.setDate(1);

while (date.getDay() !== 6) {
  date.setDate(date.getDate() + 1);
}

addDays(date, weeks * 7 + days);

console.log(date.toDateString());
