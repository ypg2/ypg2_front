import styled from "styled-components";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import useLectureDetail from "../hooks/useLectureDetail";
import { useParams } from "react-router-dom";
import { Loading } from "../components/common/Loading";
import { LecturesBtn } from "../components/Lectures/LecturesBtn";
import { theme } from "../style/theme";

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
          <div className="categories">
            {lecture.categories.map((category, i) => (
              <span key={i} className="category">
                #{category}
              </span>
            ))}
          </div>
          <LecturesBtn lecture={lecture} />
        </div>
      </header>
      <h2>강의 소개</h2>
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
      border-radius: ${theme.borderRadius.default};
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .categories {
      .category {
        display: inline-block;
        box-sizing: border-box;
        white-space: nowrap;
        background-color: ${theme.color.background};
        border: 1px solid ${theme.color.background};
        border-radius: ${theme.borderRadius.default};
        margin: 0.4rem;
        padding: 0.5rem;
      }
    }
  }
`;
