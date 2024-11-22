#!/usr/bin/env node
import minimist from "minimist";

// コマンドライン引数を解析
const args = minimist(process.argv.slice(2));
const year = args.y || new Date().getFullYear();
const month = args.m || new Date().getMonth() + 1;

// 月と年のバリデーション
if (year < 1970 || year > 2100) {
  console.error("エラー: 年は1970から2100の範囲で指定してください。");
  process.exit(1);
}

if (month < 1 || month > 12) {
  console.error("エラー: 月は1から12の範囲で指定してください。");
  process.exit(1);
}

// カレンダーの生成
function generateCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const totalDays = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();

  // 見出し
  console.log(`      ${month}月 ${year}`);
  console.log(daysOfWeek.join(" "));

  // 日付を計算して表示
  let calendar = "";
  let currentDayOfWeek = 0;

  // 空白の埋め合わせ（1日目の曜日までの空白を追加）
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendar += "   ";
    currentDayOfWeek++;
  }

  for (let day = 1; day <= totalDays; day++) {
    calendar += day.toString().padStart(2, " ") + " ";
    currentDayOfWeek++;

    // 土曜日で改行
    if (currentDayOfWeek % 7 === 0) {
      calendar += "\n";
    }
  }

  console.log(calendar.trimEnd());
}

// カレンダーを表示
generateCalendar(year, month);
