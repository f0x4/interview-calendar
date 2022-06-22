const week = [25, 26, 27, 28, 29, 30, 31];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const time = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
];

const hours = [...Array(24)].map((_, i) => i);
const events = [...Array(7 * 24)].map((_, i) => i);

export { week, weekDays, time, hours, events };
