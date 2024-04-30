import React from "react";
import { Lecture } from "../../models/lecture.model";
import Button from "../common/Button";

interface Props {
  lecture: Lecture;
  isLoggedIn: boolean;
  isSelected: (id: number) => boolean;
  onAdd: (id: number) => void;
  onDelete: (id: number) => void;
}

export const LecturesBtn = React.memo(
  ({ lecture, isLoggedIn, isSelected, onAdd, onDelete }: Props) => {
    return isLoggedIn && isSelected(lecture.lectureID) ? (
      <Button
        scheme="normal"
        size="medium"
        onClick={() => onDelete(lecture.lectureID)}
      >
        내 강의에서 삭제
      </Button>
    ) : (
      <Button
        scheme="primary"
        size="medium"
        onClick={() => onAdd(lecture.lectureID)}
      >
        내 강의에 담기
      </Button>
    );
  }
);
