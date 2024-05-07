import { useEffect, useState } from "react";
import { fetchScheduledLectures } from "../api/schedule.api";
import { ScheduledLectureFormat, formatScheduled } from "../utils/format";
import { useQuery } from "react-query";

export const useSchedules = (): {
  scheduledLectures: ScheduledLectureFormat[];
} => {
  const { data, isLoading } = useQuery("schedules", fetchScheduledLectures);

  try {
    const currentScheduledLectures = data?.data;
    const scheduledLectures = formatScheduled(currentScheduledLectures);
    return { scheduledLectures };
  } catch (error) {
    console.log(error);
  }

  return { scheduledLectures: [] };
};
