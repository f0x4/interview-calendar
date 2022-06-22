import moment from "moment";

export const isToday = (weekNumber, day) => {
    if (weekNumber !== 0) return false;
    if (day !== today()) return false;
    return true;
};

export const today = () => {
    return moment().startOf("day").toDate().getDate();
};

export const selectWeek = (weekNum) => {
    const skipedDays = Math.abs(weekNum) * 7;

    if (weekNum >= 0) {
        const startOfWeek = moment().add(skipedDays, "d").startOf("isoWeek");
        const endOfWeek = moment().add(skipedDays, "d").endOf("isoWeek");

        let days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone().add(1, "d");
        }

        return days;
    }

    const startOfWeek = moment().subtract(skipedDays, "d").startOf("isoWeek");
    const endOfWeek = moment().subtract(skipedDays, "d").endOf("isoWeek");

    let days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, "d");
    }

    return days;
};

export const getDateArr = (weekArr) => {
    const dateArr = weekArr.map((el) => el.getDate());
    return dateArr;
};

export const getMonthAndYear = (weekArr) => {
    const monthAndYear = moment.parseZone(weekArr[3]).format("MMMM YYYY");
    return monthAndYear;
};

export const getWeekKeys = (weekArr) => {
    const convert = (day) =>
        moment.parseZone(day).format("YYYY-MM-DD").toString();

    const weekKeysArr = weekArr.map((el) => convert(el));
    return weekKeysArr;
};

export const convertDateToKey = (date) => {
    const result = moment.parseZone(date).format("YYYY-MM-DD H").toString();
    return result;
};
export const isDateValid = (date) => {
    return moment.parseZone(date).isValid();
};

export const isEvent = (key, map) => {
    if (map.has(key)) return true;
    return false;
};

export const createKey = (date, time) => {
    const key = date + " " + time;
    return key;
};

export const getCurrentDate = () => {
    return moment().startOf("day").format("YYYY-MM-DD HH:mm:ss").toString();
};

// export const keyToDate = (key) => {
//     key = key + ":00:00";
//     return moment.parseZone(key).format("YYYY-MM-DD HH:mm:ss").toString();
// };
