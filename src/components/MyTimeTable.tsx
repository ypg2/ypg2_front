import styled from "styled-components";
import { theme } from "../style/theme";

type Schedule = {
  [day: string]: string[];
};

interface Props {
  onDragOver: (event: DragEvent) => void;
  onDrop: () => (event: DragEvent) => void;
}

export default function MyTimeTable({ onDragOver, onDrop }: Props) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const schedule: Schedule = days.reduce((acc, day) => {
    acc[day] = Array(18).fill("");
    return acc;
  }, {} as Schedule);

  const hours = Array.from({ length: 18 }, (_, i) => 6 + i);

  schedule["월"][0] =
    "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라";
  schedule["화"][1] =
    "자바와 스프링 부트로 생애 최초 서버 만들기, 누구나 쉽게 개발부터 배포까지! [서버 개발 올인원 패키지]";
  schedule["수"][5] = "헌법에 소추되지 형사피고인은";
  schedule["금"][3] = "웹 프로그래밍 실습";

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
                <td key={day + index}>
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
  }
  th,
  td {
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.borderRadius.default};
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
