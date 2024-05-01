<<<<<<< HEAD
=======
import styled from "styled-components";
import { theme } from "../style/theme";
import { Modal } from "./common/Modal";
import { useState } from "react";
import { useSelected } from "../hooks/useSelected";
import useLectureDetail from "../hooks/useLectureDetail";

interface Props {
  onDragStart: (event: DragEvent) => void;
}

export default function MyLectureList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLectureId, setSelectedLectureId] = useState(1);
  const { selectedLectures } = useSelected();
  const { lecture } = useLectureDetail(selectedLectureId);

  const handleModal = (id: number) => {
    setIsOpen(true);
    setSelectedLectureId(id);
    // lecture_id를 아니까 여기서 전체 강의 에서 filtering해야하나?
    // lecture Detail을 불러와야하네
  };

  return (
    <MyLectureListStyle>
      <h2>미등록 강의 목록</h2>
      <div className="lecture-list">
        <ul>
          {selectedLectures.map((lecture, _i) => {
            return (
              <li key={_i} onClick={() => handleModal(lecture.lectureID)}>
                {lecture.title}
              </li>
            );
          })}
        </ul>
      </div>

      {lecture && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="lecture-detail">
            <table>
              <tbody>
                <tr>
                  <th>강의명</th>
                  <td>{lecture.title}</td>
                </tr>
                <tr>
                  <th>강사</th>
                  <td>{lecture.lecturer}</td>
                </tr>
                <tr>
                  <th>강의 소개</th>
                  <td>{lecture.introduction}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </MyLectureListStyle>
  );
}

const MyLectureListStyle = styled.div`
  width: 40%;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: ${theme.color.primary};
  }

  .lecture-list {
    background-color: ${theme.color.background};
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;

    ul {
      width: 100%;
      padding: 0;

      li {
        list-style-type: none;
        margin: 15px;
        padding: 10px;
        border-radius: ${theme.borderRadius.default};
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;
>>>>>>> ab16663 (add: dummy 데이터를 통해 받아온 Scheduled Data를 시간표에 렌더링 개발)
