import styled from "styled-components";
import { theme } from "../style/theme";
import { Modal } from "./common/Modal";
import { useState } from "react";
import { Lecture } from "../models/lecture.model";
import { useSelected } from "../hooks/useSelected";
import { fetchLectureDetail } from "../api/lecture.api";
import Scheduling from "./Scheduling";
import { mockLectureData } from "../mock/lecture";
import Button from "./common/Button";
import { fa } from "@faker-js/faker";

interface Props {
  onDragStart: (lecture: Lecture) => (event: DragEvent) => void;
}

export default function MyLectureList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { selectedLectures } = useSelected();
  const [currentLecture, setCurrentLecture] = useState<Lecture>(
    mockLectureData[0]
  );

  const handleModal = async (id: number) => {
    await fetchLectureDetail(id).then((lecture) => {
      if (lecture) {
        setCurrentLecture(lecture);
      }
    });
    setIsOpen(true);
  };

  return (
    <MyLectureListStyle>
      <h2>미등록 강의 목록</h2>
      <div className="lecture-list">
        <ul>
          {selectedLectures.map((selected, i) => {
            return (
              <li onClick={() => handleModal(selected.lectureID)} key={i}>
                {selected.title}
              </li>
            );
          })}
        </ul>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <LectureInfoStyle>
          <h2>강의 상세 정보</h2>
          <table>
            <thead>
              <th className="info-header">강의명</th>
              <th className="info-header">강사</th>
              <th className="info-header">강의 소개</th>
              <th className="info-header">바로가기</th>
            </thead>
            <tbody>
              <td className="info-body">{currentLecture?.title}</td>
              <td className="info-body nowrap">{currentLecture?.lecturer}</td>
              <td className="info-body">{currentLecture?.introduction}</td>
              <td>
                <Button size="small" scheme="normal" className="nowrap">
                  상세페이지로
                </Button>
              </td>
            </tbody>
          </table>
        </LectureInfoStyle>
        <Scheduling lecture={currentLecture} onClose={() => setIsOpen(false)} />
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
