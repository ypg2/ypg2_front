import styled from "styled-components";
import { Lecture } from "../models/lecture.model";
import { generateTimeOptions, weekDays } from "../utils/scheduling";
import Button from "./common/Button";
import { useState } from "react";
import { useSelected } from "../hooks/useSelected";
import { ScheduledLecture } from "../models/scheduled.model";
import { fetchAddScheduled, fetchGetScheduled } from "../api/scheduled.api";

interface Props {
  lecture: Lecture;
}

export default function Scheduling({ lecture }: Props) {
  const { selectedLectures } = useSelected();
  const [day, setDay] = useState(1);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("06:30");
  const startTimeOptions = generateTimeOptions(6, 23.5);
  const endTimeOptions = generateTimeOptions(6.5, 24);

  const handleAdd = () => {
    selectedLectures.forEach((item) => {
      if (item.lectureID === lecture.lectureID) {
        const data: ScheduledLecture = {
          selectedLectureID: item.selectedLectureID,
          weekDayID: day,
          startAt: startTime,
          endAt: endTime,
        };
        fetchAddScheduled(data).then((value) => console.log(value));
      }
    });
  };

  const testGetScheduled = () => {
    fetchGetScheduled().then((value) => console.log(value));
  };

  return (
    <SchedulingStyle>
      <h2>내 시간표에 등록</h2>
      <div className="add-schedule">
        <label>요일</label>
        <Select onChange={(e) => setDay(Number(e.target.value))}>
          {weekDays.map((day) => (
            <option key={day.id} value={day.id}>
              {day.label}
            </option>
          ))}
        </Select>
        <label htmlFor="start-time-select">시작 시간</label>
        <Select onChange={(e) => setStartTime(e.target.value)}>
          {startTimeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
        <label>끝나는 시간</label>
        <Select onChange={(e) => setEndTime(e.target.value)}>
          {endTimeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
        <Button size="medium" scheme="primary" onClick={handleAdd}>
          등록
        </Button>
      </div>
      <div>
        <button onClick={testGetScheduled}>GET</button>
      </div>
    </SchedulingStyle>
  );
}

const SchedulingStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;

  label {
    font-weight: bold;
  }

  .add-schedule {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  cursor: pointer;
`;
