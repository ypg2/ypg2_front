import styled from "styled-components";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import Button from "../components/common/Button";
import useLectureDetail from "../hooks/useLectureDetail";

interface Props {
  id: number;
}

export default function LectureDetail({ id }: Props) {
  const { lecture } = useLectureDetail(id);
  const [isImgOpen, setIsImgOpen] = useState(false);

  return (
    <LectureDetailStyle>
      <header className="header">
        <div className="img">
          <img
            src={lecture.img_url}
            alt={lecture.title}
            onClick={() => setIsImgOpen(true)}
          />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <img src={lecture.img_url} alt={lecture.title} />
        </Modal>
        <div className="info">
          <h1>{lecture.title}</h1>
          <p className="lecturer">{lecture.lecturer} 강사님</p>
          <Button size="medium" scheme="primary">
            내 강의에 담기
          </Button>
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
