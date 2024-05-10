import { ScheduledLectureFormat } from "./format";

export const weekDays = [
  {
    id: 1,
    label: "월",
  },
  {
    id: 2,
    label: "화",
  },
  {
    id: 3,
    label: "수",
  },
  {
    id: 4,
    label: "목",
  },
  {
    id: 5,
    label: "금",
  },
  {
    id: 6,
    label: "토",
  },
  {
    id: 7,
    label: "일",
  },
];

export const generateTimeOptions = (startHour: number, endHour: number) => {
  let times: string[] = [];
  for (let hour = startHour; hour <= endHour; hour += 0.5) {
    const suffix = Number.isInteger(hour) ? "00" : "30";
    const formattedHour = Math.floor(hour);
    const timeString = `${
      formattedHour < 10 ? "0" + formattedHour : formattedHour
    }:${suffix}`;
    times.push(timeString);
  }
  return times;
};

export const isCanPaintSchedule = (
  lecture: ScheduledLectureFormat,
  dayIndex: number,
  hourIndex: number,
  dragingPoint: number[]
) => {
  const [dragingDayIndex, dragingHourIndex] = dragingPoint;
  const lectureStartHour = lecture.startHour;
  const lectureEndHour = lecture.endHour;
  const lectureWeekDayID = lecture.weekDayID;

  if (lectureStartHour === hourIndex + 6 && lectureWeekDayID === dayIndex + 1) {
    if (
      dragingDayIndex + 1 === lectureWeekDayID &&
      dragingHourIndex + 6 >= lectureStartHour &&
      dragingHourIndex + 6 <= lectureEndHour
    ) {
      return false;
    } else {
      return true;
    }
  }
  return false;
};
