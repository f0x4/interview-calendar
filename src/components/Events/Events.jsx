import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { time, hours } from "../../data";
import { createKey, getWeekKeys, isEvent } from "../../helpers";
import { setSelectedEventKey } from "../../redux/slices/calendarSlice";

function Events({ weekArr, eventsMap }) {
    const dispatch = useDispatch();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const weekKeys = getWeekKeys(weekArr);

    const markEvent = (e) => {
        if (!selectedEvent) {
            e.target.classList.add("selected");
            setSelectedEvent(e);
            return;
        }
        selectedEvent.target.classList.remove("selected");
        e.target.classList.add("selected");
        setSelectedEvent(e);
    };

    const selectEventKey = (date, time) => {
        const key = createKey(date, time);
        dispatch(setSelectedEventKey(key));
    };

    return (
        <EventsGrid>
            <Time />
            {time.map((el, i) => (
                <Time key={"t" + i}>{el + ":00"}</Time>
            ))}
            {weekKeys.map((date, i) =>
                hours.map((time, j) => (
                    <GridItem key={"e" + i + j}>
                        <Event
                            className={
                                isEvent(createKey(date, time), eventsMap) &&
                                "event"
                            }
                            onClick={(e) => {
                                markEvent(e);
                                selectEventKey(date, time);
                            }}
                        />
                    </GridItem>
                ))
            )}
        </EventsGrid>
    );
}

const Container = styled.section`
    width: 100%;
    display: flex;
`;

const Time = styled.span`
    height: 50px;
    margin: 0 8px;
    grid-column: 1;
    color: #9e9e9e;
    font-size: 16px;
    font-weight: 500;
    text-align: right;
    transform: translateY(-25%);
`;

const EventsGrid = styled.div`
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
    margin-bottom: -3px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(24, 1fr);
    grid-auto-flow: column;
`;
const GridItem = styled.div`
    height: 50px;
    padding: 1px;
    border-bottom: 2px solid #e6e6e6;
    border-right: 2px solid #e6e6e6;
    &:nth-last-child(-n + 24) {
        border-right: none;
    }
    &:nth-child(24n + 24) {
        border-bottom: none;
    }
`;
const Event = styled.button`
    width: 100%;
    height: 100%;
    /* ${(props) => props.isEvent && "background-color: purple;"} */
    &.event {
        background-color: #ebecff;
    }
    &.selected {
        background-color: #b3b7ff;
    }
`;

export default Events;
