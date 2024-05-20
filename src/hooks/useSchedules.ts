import { useEffect, useState } from "react";
import { ScheduledLectureFormat, formatScheduled } from "../utils/format";
import { fetchGetScheduled } from "../api/scheduled.api";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "react-query";
import { SCHEDULE_CACHE_KEY } from "../constants/cachekey";

export const useSchedules = () => {
  const { isLoggedIn } = useAuthStore();
  const [scheduledLectures, setScheduledLectures] = useState<
    ScheduledLectureFormat[]
  >([]);

  const isScheduled = (id: number) => {
    return scheduledLectures?.some((lecture) => lecture.lectureID === id);
  };
  const { data, isLoading } = useQuery<ScheduledLectureFormat[]>(
    SCHEDULE_CACHE_KEY,
    fetchGetScheduled
  );

  useEffect(() => {
    if (isLoggedIn && data) {
      setScheduledLectures(formatScheduled(data));
    }
  }, [data]);

  return { scheduledLectures, isScheduled };
};
