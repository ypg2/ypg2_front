import { ScheduledLecture } from "../models/scheduled.model";
import { authInstance } from "./http";

export const fetchAddScheduled = async (data: ScheduledLecture) => {
  const response = await authInstance.post(
    `scheduled-lectures/${data.selectedLectureID}`,
    data
  );
  // 같은 시간에 시도했을 때 처리
  return response.data.message;
};

export const fetchGetScheduled = async () => {
  const response = await authInstance.get(`scheduled-lectures`);
  return response ? response.data.data : [];
};
