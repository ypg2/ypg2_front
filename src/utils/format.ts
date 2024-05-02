import { ScheduledLecture } from "../models/scheduled.model";

export const formatSlicePagination = (
  sliceStart: number,
  paginationArr: number[]
) => {
  return paginationArr.slice(sliceStart, sliceStart + 5);
};

export interface ScheduledLectureFormat extends ScheduledLecture {
  startHour: number;
  startMinutes: number;
  endHour: number;
  endMinutes: number;
}

export const formatScheduled = (scheduledLectures: ScheduledLecture[]) => {
  const formmatedScheduledLectures: ScheduledLectureFormat[] =
    scheduledLectures?.map((scheduledLecture) => ({
      ...scheduledLecture,
      startHour: parseInt(scheduledLecture.startAt.split(":")[0]),
      startMinutes: parseInt(scheduledLecture.startAt.split(":")[1]),
      endHour: parseInt(scheduledLecture.endAt.split(":")[0]),
      endMinutes: parseInt(scheduledLecture.endAt.split(":")[1]),
    }));
  return formmatedScheduledLectures;
};
