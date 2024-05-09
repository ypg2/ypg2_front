import styled from "styled-components";
import { Lecture } from "../../models/lecture.model";
import { useState } from "react";
import Button from "../common/Button";
import { LecturesBtn } from "./LecturesBtn";
import { useNavigate } from "react-router-dom";
import { theme } from "../../style/theme";

interface Props {
  lectures: Lecture[];
}

type ViewMode = "column" | "row";

export default function LecturesList({ lectures }: Props) {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewMode>("column");

  return (
    <LecturesListStyle view={view}>
      <div className="grid">
        <Button scheme="primary" size="small" onClick={() => setView("column")}>
          2줄
        </Button>
        <Button scheme="primary" size="small" onClick={() => setView("row")}>
          4줄
        </Button>
      </div>

      <div className="lectureBox">
        {lectures.map((lecture, i) => (
          <div className="lectureContent" key={i}>
            <div
              className="to-detail"
              onClick={() => navigate(`/lectures/${lecture.lectureID}`)}
            >
              <img src={`${lecture.imgURL}/300`} alt={`${lecture.title}`} />
              <h2 className="title">{lecture.title}</h2>
              <span className="lecturer">{lecture.lecturer}</span>
              <span className="introduction">{lecture.introduction}</span>
            </div>
            <LecturesBtn lecture={lecture} />
          </div>
        ))}
      </div>
    </LecturesListStyle>
  );
}
interface LecturesListStyleProps {
  view: ViewMode;
}
const LecturesListStyle = styled.div<LecturesListStyleProps>`
  display: flex;
  flex-direction: column;

  .grid {
    display: flex;
    gap: 10px;
  }

  .lectureBox {
    display: grid;
    grid-template-columns: ${({ view }) =>
      view === "column" ? "repeat(2, 2fr)" : "repeat(4, 1fr)"};
    gap: 24px;
    margin: 20px 0;

    .lectureContent {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;

      border-radius: ${theme.borderRadius.default};
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border: 1px solid #eaeaea;

      .to-detail {
        cursor: pointer;
      }

      .to-detail:hover {
        background-color: #f9f9f9;
      }

      img {
        width: 100%;
        border-radius: ${theme.borderRadius.default};
      }

      .title {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 0 15px;
      }

      .lecturer {
        opacity: 0.5;
        padding: 0 15px;
      }

      .introduction {
        padding: 0 15px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      button {
        margin: 10px;
      }
    }
  }
`;
