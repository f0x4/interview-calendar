import React, { useState } from "react";
import styled from "styled-components";
import Events from "./components/Events/Events";
import Navigation from "./components/Navigation/Navigation";
import { useSelector } from "react-redux";
import { getSelectedEventKey, getWeekNum } from "./redux/slices/calendarSlice";
import { getCurrentDate, isEvent, selectWeek } from "./helpers";
import {
    addEventToStorage,
    getEventsFromStorage,
    removeEventFromStorage,
} from "./storage";

function App() {
    const weekNum = useSelector(getWeekNum);
    const weekArr = selectWeek(weekNum);

    const [eventsMap, setEventsMap] = useState(getEventsFromStorage());
    const selectedEventKey = useSelector(getSelectedEventKey);

    const addEvent = () => {
        const info = "Enter event time:\nYYYY-MM-DD HH:mm:ss";
        const fast = getCurrentDate();
        const date = prompt(info, fast);
        if (!date) return;
        addEventToStorage(date, eventsMap);
        updateEvents();
    };

    const removeEvent = () => {
        removeEventFromStorage(selectedEventKey, eventsMap);
        updateEvents();
    };

    const updateEvents = () => {
        setEventsMap(getEventsFromStorage());
    };

    return (
        <>
            <Header>
                <Title>Interview Calendar</Title>
                <Add onClick={addEvent}>+</Add>
            </Header>
            <Navigation weekNum={weekNum} weekArr={weekArr} />
            <Events weekArr={weekArr} eventsMap={eventsMap} />
            <Footer>
                <Tooday>Today</Tooday>
                {isEvent(selectedEventKey, eventsMap) && (
                    <Delete onClick={removeEvent}>Delete</Delete>
                )}
            </Footer>
        </>
    );
}

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    border-bottom: 2px solid #e6e6e6;
`;
const Title = styled.h1`
    font-size: 28px;
    font-weight: normal;
`;
const Add = styled.button`
    font-size: 46px;
    font-weight: lighter;
    color: red;
`;
const Footer = styled.footer`
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    border-top: 2px solid #e6e6e6;
    background-color: #f6f6f6;
    z-index: 1;
`;
const Tooday = styled.span`
    font-size: 22px;
    color: red;
    margin-left: 24px;
`;
const Delete = styled.button`
    font-size: 23px;
    color: red;
    margin-left: auto;
    margin-right: 24px;
`;

export default App;
