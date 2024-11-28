#!/usr/bin/env node

import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const now = new Date();
const year = args.y ?? now.getFullYear();
const month = args.m ?? now.getMonth() + 1;

if (year < 1970 || year > 2100) {
  console.error("エラー: 年は1970から2100の範囲で指定してください。");
  process.exit(1);
}

if (month < 1 || month > 12) {
  console.error("エラー: 月は1から12の範囲で指定してください。");
  process.exit(1);
}

function printCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const daysOfWeek = "日 月 火 水 木 金 土";
  const totalDays = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();

  console.log(`      ${month}月 ${year}`);
  console.log(daysOfWeek);

  let calendar = "";
  let currentDayOfWeek = firstDayOfWeek;

  calendar += "   ".repeat(currentDayOfWeek);

  for (let day = 1; day <= totalDays; day++) {
    calendar += `${day.toString().padStart(2, " ")} `;
    currentDayOfWeek = (currentDayOfWeek + 1) % 7;

    if (currentDayOfWeek === 0 && day !== totalDays) {
      calendar += "\n";
    }
  }
  console.log(calendar);
}

printCalendar(year, month);
