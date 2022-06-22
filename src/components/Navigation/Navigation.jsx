import React from "react";
import styled from "styled-components";
import { getDateArr, getMonthAndYear, isToday } from "../../helpers";
import { weekDays } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { nextWeek, prevWeek } from "../../redux/slices/calendarSlice";

function Navigation({ weekNum, weekArr }) {
    // { dateArr, monthAndYear, weekNum }
    const dispatch = useDispatch();

    const dateArr = getDateArr(weekArr);
    const monthAndYear = getMonthAndYear(weekArr);

    const NextWeek = () => dispatch(nextWeek());
    const PrevWeek = () => dispatch(prevWeek());

    return (
        <Container>
            <Day></Day>
            {weekDays.map((_, i) => (
                <Day key={"w" + i}>
                    <WeekDay>{weekDays[i]}</WeekDay>
                    <NumberWrapper isToday={isToday(weekNum, dateArr[i])}>
                        <Number>{dateArr[i]}</Number>
                    </NumberWrapper>
                </Day>
            ))}

            <Left onClick={PrevWeek}>{"<"}</Left>
            <Month>{monthAndYear}</Month>
            <Right onClick={NextWeek}>{">"}</Right>
        </Container>
    );
}

const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    padding: 10px 0;
    background-color: #f6f6f6;
    border-bottom: 2px solid #e6e6e6;
`;
const Day = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const WeekDay = styled.span`
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
`;
const NumberWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.isToday === true ? "red" : "transparent"};
    color: ${(props) => (props.isToday === true ? "white" : "black")};
    width: 35px;
    height: 35px;
    border-radius: 25px;
`;
const Number = styled.span`
    width: 35px;
    height: 35px;
    border-radius: 25px;
    margin-top: 4px;
    font-size: 20px;
    font-weight: 500;
`;
const Week = styled.div`
    display: flex;
    justify-content: space-between;
    grid-column: 2/9;
`;
const Left = styled.button`
    font-size: 24px;
    grid-column: 2/3;
    color: red;
`;
const Right = styled.button`
    font-size: 24px;
    grid-column: 8/9;
    color: red;
`;
const Month = styled.span`
    margin: auto 0;
    justify-self: center;
    grid-column: 3/8;
    font-size: 18px;
`;

export default Navigation;
