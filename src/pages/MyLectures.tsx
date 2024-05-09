import styled from "styled-components";
import MyLectureList from "../components/MyLectureList";
import MyTimeTable from "../components/MyTimeTable";
import { DragAndDropProvider } from "../context/DragAndDrop";

export default function MyLectures() {
  return (
    <MyLecturesStyle>
      <div className="description">
        <p>내 시간표 속 강의를 드래그해 원하는 시간으로 옮기세요.</p>
        <p>쓰레기통으로 드래그하면 강의가 삭제됩니다.</p>
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
