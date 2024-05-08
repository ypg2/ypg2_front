import { useEffect, useState } from "react";
import { ScheduledLectureFormat, formatScheduled } from "../utils/format";
import { fetchGetScheduled } from "../api/scheduled.api";
import { useAuthStore } from "../store/authStore";

export const useSchedules = () => {
  const { isLoggedIn } = useAuthStore();
  const [scheduledLectures, setScheduledLectures] = useState<
    ScheduledLectureFormat[]
  >([]);

  const isScheduled = (id: number) => {
    return scheduledLectures?.some((lecture) => lecture.lectureID === id);
  };

  useEffect(() => {
    const handleScheduledLectures = async () => {
      const response = await fetchGetScheduled();
      const currentScheduledLectures = response.data;
      const currentFormatScheduledLectures = formatScheduled(
        currentScheduledLectures
      );

      setScheduledLectures(currentFormatScheduledLectures);
    };

    if (isLoggedIn) handleScheduledLectures();
  }, []);

  return { scheduledLectures, isScheduled };
};
