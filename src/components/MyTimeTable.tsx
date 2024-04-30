import styled from "styled-components";
import { theme } from "../style/theme";
import { DragEvent } from "react";

type Schedule = {
  [day: string]: string[];
};

interface Props {
  onDragOver: (event: DragEvent<HTMLTableCellElement>) => void;
  onDrop: (event: DragEvent<HTMLTableCellElement>) => void;
}

export default function MyTimeTable({ onDragOver, onDrop }: any) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const schedule: Schedule = days.reduce((acc, day) => {
    acc[day] = Array(18).fill("");
    return acc;
  }, {} as Schedule);

  const hours = Array.from({ length: 18 }, (_, i) => String(6 + i));
  const dropHandler = onDrop();

  return (
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
                  draggable
                  onDragOver={onDragOver}
                  onDrop={dropHandler}
                >
                  <p>{schedule[day][index]}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </MyTimeTableStyle>
  );
}

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
