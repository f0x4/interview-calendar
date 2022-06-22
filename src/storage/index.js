import { convertDateToKey, isDateValid } from "../helpers";

const eventsKey = "events";

export const getEventsFromStorage = () => {
    if (!localStorage.getItem(eventsKey)) {
        const map = new Map();
        addEventsMapToStorage(map);
        return map;
    }
    const data = localStorage.getItem(eventsKey);
    const json = JSON.parse(data);
    const eventsMap = new Map(json);
    return eventsMap;
};

export const addEventsMapToStorage = (eventsMap) => {
    const arr = Array.from(eventsMap.entries());
    const json = JSON.stringify(arr);
    localStorage.setItem(eventsKey, json);
};

export const addEventToStorage = (date, eventsMap) => {
    if (!isDateValid(date)) {
        alert("Date is wrong");
        return;
    }
    const key = convertDateToKey(date);
    if (eventsMap.has(key)) return;
    addEventsMapToStorage(eventsMap.set(key, ""));
};

export const removeEventFromStorage = (key, eventsMap) => {
    if (!eventsMap.has(key)) return;
    eventsMap.delete(key);
    addEventsMapToStorage(eventsMap);
};
