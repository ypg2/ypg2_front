import styled from "styled-components";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import useLectureDetail from "../hooks/useLectureDetail";
import { useParams } from "react-router-dom";
import { Loading } from "../components/common/Loading";
import { LecturesBtn } from "../components/Lectures/LecturesBtn";

export default function LectureDetail() {
  const { id } = useParams();
  const { lecture } = useLectureDetail(Number(id));
  const [isImgOpen, setIsImgOpen] = useState(false);

  return !lecture ? (
    <Loading />
  ) : (
    <LectureDetailStyle>
      <header className="header">
        <div className="img">
          <img
            src={`${lecture.imgURL}/300`}
            alt={lecture.title}
            onClick={() => setIsImgOpen(true)}
          />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <img src={lecture.imgURL} alt={lecture.title} />
        </Modal>
        <div className="info">
          <h1>{lecture.title}</h1>
          <p className="lecturer">{lecture.lecturer} 강사님</p>
          <LecturesBtn lecture={lecture} />
        </div>
      </header>
      <div className="content">{lecture.introduction}</div>
    </LectureDetailStyle>
  );
}

const LectureDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;
  }

  .img {
    flex: 1;
    img {
      width: 100%;
      height: auto;
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
