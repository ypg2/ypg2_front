import { useEffect, useState } from "react";
import { fetchScheduledLectures } from "../api/schedule.api";
import { ScheduledLectureFormat, formatScheduled } from "../utils/format";

export const useSchedules = () => {
  const [scheduledLectures, setScheduledLectures] =
    useState<ScheduledLectureFormat[]>();

  const isScheduled = (id: number) => {
    return scheduledLectures?.some((lecture) => lecture.lectureID === id);
  };

  useEffect(() => {
    const handleScheduledLectures = async () => {
      const response = await fetchScheduledLectures();
      const currentScheduledLectures = response.data;
      const currentFormatScheduledLectures = formatScheduled(
        currentScheduledLectures
      );

      setScheduledLectures(currentFormatScheduledLectures);
    };

    handleScheduledLectures();
  }, []);

  return { scheduledLectures, isScheduled };
};
