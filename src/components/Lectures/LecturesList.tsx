import styled from "styled-components";
import { Lecture } from "../../models/lecture.model";
import { useState } from "react";
import Button from "../common/Button";
import { useAuthStore } from "../../store/authStore";
import { fetchDeleteSelected, fetchPostSelected } from "../../api/selected.api";
import { useSelected } from "../../hooks/useSelected";
import { LecturesBtn } from "./LecturesBtn";

interface Props {
  lectures: Lecture[];
}

type ViewMode = "column" | "row";

export default function LecturesList({ lectures }: Props) {
  const { isLoggedIn } = useAuthStore();
  const [view, setView] = useState<ViewMode>("column");
  const { selectedLectures, isSelected } = useSelected();

  const handleSelect = async (lectureID: number) => {
    if (!isLoggedIn) {
      const userResponse = window.confirm("로그인 페이지로 이동하시겠습니까?");
      if (userResponse) {
        window.location.href = "/login";
      }
      return;
    }

    const result = await fetchPostSelected(lectureID);
    window.alert(result.message);
  };

  const handleGetSelected = () => {
    console.log(selectedLectures);
  };

  const handleDelete = async (id: number) => {
    const userResponse = window.confirm("내 강의에서 삭제하시겠습니까?");
    if (userResponse) {
      const result = await fetchDeleteSelected(id);
      window.alert(result.message);
    }
  };

  return (
    <LecturesListStyle view={view}>
      <div className="grid">
        <Button scheme="like" size="small" onClick={() => setView("column")}>
          2줄
        </Button>
        <Button scheme="like" size="small" onClick={() => setView("row")}>
          4줄
        </Button>
        <Button
          scheme="normal"
          size="small"
          onClick={() => handleGetSelected()}
        >
          GetSelected테스트용입니다
        </Button>
      </div>

      <div className="lectureBox">
        {lectures.map((lecture, i) => (
          <div className="lectureContent" key={i}>
            {/* https://picsum.photos/id/1 */}
            <img src={`${lecture.imgURL}/300`} alt={`${lecture.title}`} />
            <h2 className="title">{lecture.title}</h2>
            <span className="lecturer">{lecture.lecturer}</span>
            <LecturesBtn
              lecture={lecture}
              isLoggedIn={isLoggedIn}
              isSelected={isSelected}
              onAdd={handleSelect}
              onDelete={handleDelete}
            />
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
      align-items: flex-start;
      img {
        width: 100%;
        border-radius: 20px;
      }

      .title {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 0;
        /* font-weight: 500; */
        /* font-size: 18px; */
      }

      .lecturer {
        opacity: 0.5;
        /* font-size: 14px; */
      }

      .introduction {
        /* font-size: 14px; */

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
