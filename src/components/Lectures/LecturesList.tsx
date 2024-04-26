import styled from "styled-components";
import { Lecture } from "../../models/lecture.model";
import { useState } from "react";
import Button from "../common/Button";

interface Props {
  lectures: Lecture[];
}

type ViewMode = "column" | "row";

export default function LecturesList({ lectures }: Props) {
  const [view, setView] = useState<ViewMode>("column");

  return (
    <LecturesListStyle view={view}>
      <div className="grid">
        <Button scheme="like" size="small" onClick={() => setView("column")}>
          2줄
        </Button>
        <Button scheme="like" size="small" onClick={() => setView("row")}>
          4줄
        </Button>
      </div>
      <div className="lectureBox">
        {lectures.map((lecture, i) => (
          <div className="lectureContent" key={i}>
            <img src={`${lecture.imgURL}/200`} />
            <span className="title">{lecture.title}</span>
            <span className="lecturer">{lecture.lecturer}</span>
            <span className="introduction">{lecture.introduction}</span>
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
  .lectureBox {
    display: grid;
    grid-template-columns: ${({ view }) =>
      view === "column" ? "repeat(2, 2fr)" : "repeat(4, 1fr)"};
    gap: 24px;
    .lectureContent {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      img {
        border-radius: 20px;
      }
      .title {
        margin-top: 10px;
        font-weight: 500;
        font-size: 18px;
      }
      .lecturer {
        opacity: 0.5;
        font-size: 14px;
      }
      .introduction {
        font-size: 14px;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    margin: 20px 0;
  }
`;
