import styled from "styled-components";
import MyLectureList from "../components/MyLectureList";
import MyTimeTable from "../components/MyTimeTable";
import { Lecture } from "../models/lecture.model";
import { useState } from "react";

export default function MyLectures() {
  const [draggedItem, setDraggedItem] = useState<Lecture | null>(null);

  const handleDragStart =
    (title: string) => (event: React.DragEvent<HTMLLIElement>) => {
      event.dataTransfer?.setData("text/plain", title);
    };

  const handleDragOver = (event: React.DragEvent<HTMLTableCellElement>) => {
    event.preventDefault(); // 드롭 가능 영역으로 설정
  };

  const handleDrop = () => (event: React.DragEvent<HTMLTableCellElement>) => {
    const title = event.dataTransfer.getData("text/plain");
    console.dir(event.target);
    // 이제 이걸 넣어주어야함
  };

  return (
    <MyLecturesStyle>
      <div className="description">
        <p>왼쪽의 강의 목록을 오른쪽에 드래그해 시간을 설정하세요.</p>
      </div>
      <div className="tables">
        <MyLectureList />
        <MyTimeTable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
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
