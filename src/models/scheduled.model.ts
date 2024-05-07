export interface ScheduledLecture {
  lectureID?: number;
  scheduledLectureID?: number;
  selectedLectureID?: number;
  weekDayID: number;
  startAt: string;
  endAt: string;
  title?: string;
}
