import styled from "styled-components";
import { theme } from "../style/theme";
import { days, hours, initializeSchedule } from "../utils/timeTable";
import { useSchedules } from "../hooks/useSchedules";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableContents from "./TableContents";

export type Schedule = {
  [day: string]: string[];
};

export default function MyTimeTable() {
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
  position: relative;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    height: 50px;
    text-align: center;
    position: relative;
    border: 1px solid #ddd;
  }

  .draging {
    border: 2px dotted midnightblue;
    background-color: #ddd;
  }

  .hoverd {
    background-color: aliceblue;
  }
  th {
    background-color: ${theme.color.background};
  }
  p {
    margin: 0;
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }
  .modal {
    position: absolute;
    display: flex;
    padding: 50px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-radius: ${theme.borderRadius.default};
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
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
