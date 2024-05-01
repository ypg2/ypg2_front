import { ScheduledLecture } from "../models/scheduled.model";
import { authInstance } from "./http";

export const fetchAddScheduled = async (data: ScheduledLecture) => {
  const response = await authInstance.post(
    `scheduled-lectures/${data.selectedLectureID}`,
    data
  );
  return response.data.message;
};

export const fetchGetScheduled = async () => {
  const response = await authInstance.get(`scheduled-lectures`);
  return response ? response.data.data : [];
};

// 백엔드에서 수정 예정
// export const fetchDeleteScheduled = async (data: ScheduledLecture) => {
//   const response = await authInstance.delete(
//     `scheduled-lectures/${data.selectedLectureID}/${data.scheduledLectureID}`
//   );
//   return response.data.message;
// };
