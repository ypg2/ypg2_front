import styled from "styled-components";
import MyLectureList from "../components/MyLectureList";
import MyTimeTable from "../components/MyTimeTable";
import { Lecture } from "../models/lecture.model";
import { useState } from "react";

export default function MyLectures() {
  const [draggedItem, setDraggedItem] = useState<Lecture | null>(null);

  const handleDragStart =
    (lecture: Lecture) => (event: React.DragEvent<HTMLLIElement>) => {
      setDraggedItem(lecture);
      event.dataTransfer?.setData("text/plain", String(lecture.lectureID));
    };

  const handleDragOver = (event: React.DragEvent<HTMLTableCellElement>) => {
    event.preventDefault(); // 드롭 가능 영역으로 설정
  };

  const handleDrop = () => (event: React.DragEvent<HTMLTableCellElement>) => {
    //여기로 가는 구나
    /*
    
    if (event.dataTransfer) {
      const droppedLectureId = event.dataTransfer.getData("text/plain");
      if (droppedLectureId && draggedItem) {
        // 드롭 로직을 구현합니다.
        // 예: 해당 timeSlot에 드래그된 강의 정보를 할당
      }
    }
    */
  };

  return (
    <MyLecturesStyle>
      <div className="description">
        <p>왼쪽의 강의 목록을 오른쪽에 드래그해 시간을 설정하세요.</p>
      </div>
      <div className="tables">
        <MyLectureList onDragStart={handleDragStart} />
        <MyTimeTable onDragOver={handleDragOver} onDrop={handleDrop} />
      </div>
    </MyLecturesStyle>
  );
}

const MyLecturesStyle = styled.div`
  display: flex;
  flex-direction: column;

  .tables {
    display: flex;
    justify-content: space-between;
  }
`;
