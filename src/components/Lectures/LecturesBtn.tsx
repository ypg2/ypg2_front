import React from "react";
import { Lecture } from "../../models/lecture.model";
import Button from "../common/Button";
import { useAuthStore } from "../../store/authStore";
import { useSelected } from "../../hooks/useSelected";

interface Props {
  lecture: Lecture;
}

export const LecturesBtn = React.memo(({ lecture }: Props) => {
  const { isLoggedIn } = useAuthStore();
  const { isSelected, addSelected, deleteSelected } = useSelected();

  return isLoggedIn && isSelected(lecture.lectureID) ? (
    <Button
      scheme="normal"
      size="medium"
      onClick={() => deleteSelected(lecture.lectureID)}
    >
      내 강의에서 삭제
    </Button>
  ) : (
    <Button
      scheme="primary"
      size="medium"
      onClick={() => addSelected(lecture.lectureID)}
    >
      내 강의에 담기
    </Button>
  );
});
