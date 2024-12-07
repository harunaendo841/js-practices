#!/usr/bin/env node

import minimist from "minimist";

function validateYearAndMonth(year, month) {
  if (year < 1970 || year > 2100) {
    console.error("エラー: 年は1970から2100の範囲で指定してください。");
    process.exit(1);
  }

  if (month < 1 || month > 12) {
    console.error("エラー: 月は1から12の範囲で指定してください。");
    process.exit(1);
  }
}

function printCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const daysOfWeek = "日 月 火 水 木 金 土";
  const calendarTitle = `      ${month}月 ${year}`;
  console.log(calendarTitle);
  console.log(daysOfWeek);

  let calendar = "";
  let currentDate = new Date(firstDay);

  for (let i = 0; i < currentDate.getDay(); i++) {
    calendar += "   ";
  }

  while (currentDate <= lastDay) {
    const day = currentDate.getDate();
    calendar += day.toString().padStart(2, " ");

    if (
      currentDate.getDay() === 6 ||
      currentDate.getTime() === lastDay.getTime()
    ) {
      calendar += "\n";
    } else {
      calendar += " ";
    }

    currentDate.setDate(day + 1);
  }

  console.log(calendar);
}

function main() {
  const args = minimist(process.argv.slice(2));
  const now = new Date();
  const year = args.y ?? now.getFullYear();
  const month = args.m ?? now.getMonth() + 1;

  validateYearAndMonth(year, month);
  printCalendar(year, month);
}

main();
