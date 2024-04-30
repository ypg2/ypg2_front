import { useEffect, useState } from "react";
import { SelectedLecture } from "../models/selected.model";
import { fetchGetSelected } from "../api/selected.api";

export const useSelected = () => {
  const [selectedLectures, setSelectedLectures] = useState<SelectedLecture[]>(
    []
  );

  const isSelected = (lectureID: number) => {
    return selectedLectures.some((lecture) => lecture.lectureID === lectureID);
  };

  useEffect(() => {
    fetchGetSelected().then((items) => {
      setSelectedLectures(items);
    });
  }, [selectedLectures]);

  return { selectedLectures, isSelected };
};
