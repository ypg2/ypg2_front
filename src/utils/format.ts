import { UpdateProps } from "../context/DragAndDrop";
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

export const calculateStartPoint = (lecture: ScheduledLectureFormat) => {
  const startMinutes = lecture.startMinutes;
  const startPoint = startMinutes === 0 ? 0 : 50;

  return startPoint;
};

export const calculateHowLong = (lecture: ScheduledLectureFormat) => {
  const endMinutes = lecture.endMinutes;
  const endHour = lecture.endHour;
  const startMinutes = lecture.startMinutes;
  const startHour = lecture.startHour;

  const howlong =
    endMinutes - startMinutes === 0
      ? endHour - startHour
      : endMinutes - startMinutes > 0
      ? endHour - startHour + 0.5
      : endHour - startHour - 0.5;

  return howlong;
};

export const formatStartEnd = (dropData: UpdateProps, minute: string) => {
  let [startHour, startMinute] = [dropData.startAt, 0];
  let [endHour, endMinute] = [0, 0];

  if (minute === "0") {
    endHour = startHour + Math.floor(dropData.howLong);
    if (dropData.howLong % 2 !== 0) {
      endMinute = endMinute + 30;
    }
  } else if (minute === "0.5") {
    startMinute = 30;
    endHour = startHour + Math.floor(dropData.howLong);
    if (dropData.howLong % 2 !== 0) {
      endHour = endHour + 1;
    } else if (dropData.howLong % 2 === 0) {
      endMinute = 30;
    }
  }

  const startAt =
    String(startHour).padStart(2, "0") +
    ":" +
    String(startMinute).padStart(2, "0");
  const endAt =
    String(endHour).padStart(2, "0") + ":" + String(endMinute).padStart(2, "0");

  const checkEndAt = endAt.split(`:`);
  if (
    Number(checkEndAt[0]) > 24 ||
    (Number(checkEndAt[0]) === 24 && Number(checkEndAt[1]) === 30)
  ) {
    throw new Error("스케줄 가능한 시간을 지켜주세요.");
  }

  return [startAt, endAt];
};
