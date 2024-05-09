import { tr } from "@faker-js/faker";
import { fetchScheduledLectures } from "../api/schedule.api";
import { ScheduledLectureFormat, formatScheduled } from "../utils/format";
import { useQuery } from "react-query";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { fetchGetScheduled } from "../api/scheduled.api";

export const useSchedules = () => {
  const { isLoggedIn } = useAuthStore();
  const [scheduledLectures, setScheduledLectures] = useState<
    ScheduledLectureFormat[]
  >([]);

  const isScheduled = (id: number) => {
    return scheduledLectures?.some((lecture) => lecture.lectureID === id);
  };
  const { data, isLoading } = useQuery<ScheduledLectureFormat[]>(
    "schedules",
    fetchGetScheduled
  );

  useEffect(() => {
    if (data) {
      setScheduledLectures(formatScheduled(data));
    }
  }, [data]);

  return { scheduledLectures, isScheduled };
};
