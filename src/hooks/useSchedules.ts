import { useEffect, useState } from "react";
import { fetchScheduledLectures } from "../api/schedule.api";
import { ScheduledLectureFormat, formatScheduled } from "../utils/format";
import { useQuery } from "react-query";

export const useSchedules = (): {
  scheduledLectures: ScheduledLectureFormat[];
  isScheduled: any;
} => {
  const { data, isLoading } = useQuery("schedules", fetchScheduledLectures);

  try {
    const currentScheduledLectures = data?.data;
    const scheduledLectures = formatScheduled(currentScheduledLectures);
    const isScheduled = (id: number) => {
      return scheduledLectures?.some((lecture) => lecture.lectureID === id);
    };
    return { scheduledLectures, isScheduled };
  } catch (error) {
    console.log(error);
  }

  return { scheduledLectures: [], isScheduled: 1 };
};
