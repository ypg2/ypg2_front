import styled from "styled-components";
import { theme } from "../style/theme";
import { DragEvent, useEffect, useState } from "react";
import { ScheduledLectureFormat, formatScheduled } from "../utils/format";
import { days, hours, initializeSchedule } from "../utils/timeTable";
import { useSchedules } from "../hooks/useSchedules";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableCell from "./TableCell";
import TableContents from "./TableContents";

export type Schedule = {
  [day: string]: string[];
};

interface TableCellProps {
  howLong: number;
  startPoint: number;
}

interface Props {
  onDragOver: (event: DragEvent<HTMLTableCellElement>) => void;
  onDrop: (event: DragEvent<HTMLTableCellElement>) => void;
}

export default function MyTimeTable({ onDragStart, onDragOver, onDrop }: any) {
  const dropHandler = onDrop();
  const { scheduledLectures } = useSchedules();
  const schedule = initializeSchedule();

  return (
    <MyTimeTableStyle>
      <TableContainer>
        <TableHeader />
        <TableContents
          schedule={schedule}
          scheduledLectures={scheduledLectures}
        />
      </TableContainer>
    </MyTimeTableStyle>
  );
}
// 길이

// 스타일 컴포넌트
const MyTimeTableStyle = styled.div`
  width: 70%;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid #ddd;
    height: 50px;
    text-align: center;
    position: relative;
  }
  th {
    background-color: #f2f2f2;
  }
  p {
    margin: 0;
  }
  .TableData {
  }
`;

/*
const MyTimeTableStyle = styled.div`
  width: 60%;
  flex-grow: 1;
  padding: 20px;

  h2 {
    color: ${theme.color.primary};
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-style: none;
  }
  th,
  td {
    border: 1px solid ${theme.color.border};
    text-align: center;
    padding: 7px;

    p {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      margin: 0;
      padding: 0;
    }
  }
  th {
    background-color: ${theme.color.background};
  }
`;


<MyTimeTableStyle>
      <h2>내 시간표</h2>
      <table>
        <thead>
          <tr>
            <th>시간</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => (
            <tr key={hour}>
              <td>
                <b>{`${hour}:00`}</b>
              </td>
              {days.map((day) => (
                <td
                  key={day + index}
                  draggable={tableData[day][index] ? true : false}
                  onDragStart={onDragStart(tableData[day][index])}
                  onDragOver={onDragOver}
                  onDrop={dropHandler}
                  className={tableData[day][index]? "merge" :"divide"}
                  //여기서 Index를 심는건 ?
                >
                  <p>{tableData[day][index]}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </MyTimeTableStyle>
*/
