import styled from "styled-components";
import MyLectureList from "../components/MyLectureList";
import MyTimeTable from "../components/MyTimeTable";
import { DragAndDropProvider } from "../context/DragAndDrop";

interface Props {
  weekDayID: number;
  startAt: number;
  endAt: number;
}

export default function MyLectures() {
  return (
    <MyLecturesStyle>
      <div className="description">
        <p>왼쪽의 강의 목록을 오른쪽에 드래그해 시간을 설정하세요.</p>
      </div>
      <div className="tables">
        <MyLectureList />
        <DragAndDropProvider>
          <MyTimeTable />
        </DragAndDropProvider>
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
