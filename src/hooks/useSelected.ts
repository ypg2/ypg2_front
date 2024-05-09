import { useEffect, useState } from "react";
import { SelectedLecture } from "../models/selected.model";
import {
  fetchDeleteSelected,
  fetchGetSelected,
  fetchPostSelected,
} from "../api/selected.api";
import { useAuthStore } from "../store/authStore";

export const useSelected = () => {
  const { isLoggedIn } = useAuthStore();
  const [selectedLectures, setSelectedLectures] = useState<SelectedLecture[]>(
    []
  );

  const isSelected = (lectureID: number) => {
    return selectedLectures?.some((lecture) => lecture.lectureID === lectureID);
  };

  const addSelected = async (lectureID: number) => {
    if (!isLoggedIn) {
      const userResponse = window.confirm("로그인 페이지로 이동하시겠습니까?");
      if (userResponse) {
        window.location.href = "/login";
      }
      return;
    }

    const result = await fetchPostSelected(lectureID);
    getSelected();
    window.alert(result.message);
  };

  const deleteSelected = async (id: number) => {
    const userResponse = window.confirm("내 강의에서 삭제하시겠습니까?");
    if (userResponse) {
      const result = await fetchDeleteSelected(id);
      getSelected();
      window.alert(result.message);
    }
  };

  const getSelected = () => {
    if (isLoggedIn) {
      fetchGetSelected().then((items) => {
        setSelectedLectures(items);
      });
    }
  };

  useEffect(() => {
    getSelected();
  }, []);

  return { selectedLectures, isSelected, addSelected, deleteSelected };
};
