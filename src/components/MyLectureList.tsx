import styled from "styled-components";
import { theme } from "../style/theme";
import { Modal } from "./common/Modal";
import { useRef, useState } from "react";
import { Lecture } from "../models/lecture.model";
import { useSelected } from "../hooks/useSelected";
import { fetchLectureDetail } from "../api/lectures.api";
import Scheduling from "./Scheduling";
import { mockLectureData } from "../mock/lecture";

interface Props {
  onDragStart: (event: DragEvent) => void;
}

export default function MyLectureList({ onDragStart }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture>(
    mockLectureData[0]
  );

  const handleModal = async (id: number) => {
    await fetchLectureDetail(id).then((lecture) => {
      if (lecture) {
        setSelectedLecture(lecture);
      }
    });
    setIsOpen(true);
    setSelectedLecture(mockLectureData[id]);
  };

  return (
    <MyLectureListStyle>
      <h2>미등록 강의 목록</h2>
      <div className="lecture-list">
        <ul>
          {mockLectureData.map((lecture) => {
            return (
              <li
                key={_i}
                onClick={() => handleModal(lecture.lectureID)}
                draggable
                onDragStart={onDragStart(lecture)}
              >
                {lecture.title}
              </li>
            );
          })}
        </ul>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="lecture-detail">
          <table>
            <tbody>
              <tr>
                <th>강의명</th>
                <td>{selectedLecture.title}</td>
              </tr>
              <tr>
                <th>강사</th>
                <td>{selectedLecture.lecturer}</td>
              </tr>
              <tr>
                <th>강의 소개</th>
                <td>{selectedLecture.introduction}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
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
        cursor: pointer;

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

const LectureInfoStyle = styled.div`
  .info-header {
    white-space: nowrap;
    text-align: left;
    padding: 10px;
  }

  .info-body {
    padding: 10px;
  }

  .nowrap {
    white-space: nowrap;
  }
`;
