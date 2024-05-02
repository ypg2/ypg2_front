import React from "react";
import { Lecture } from "../../models/lecture.model";
import Button from "../common/Button";
import { useAuthStore } from "../../store/authStore";
import { useSelected } from "../../hooks/useSelected";
import { useSchedules } from "../../hooks/useSchedules";

interface Props {
  lecture: Lecture;
}

export const LecturesBtn = React.memo(({ lecture }: Props) => {
  const { isLoggedIn } = useAuthStore();
  const { isSelected, addSelected } = useSelected();
  const { isScheduled } = useSchedules();

  return isLoggedIn &&
    (isSelected(lecture.lectureID) || isScheduled(lecture.lectureID)) ? (
    <Button scheme="normal" size="medium" disabled>
      내 강의
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
