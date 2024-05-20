import axios from "axios";
import { ScheduledLecture } from "../models/scheduled.model";
import { authInstance } from "./http";
import { UpdateProps } from "../components/Schedule/TableContents";

export const fetchAddScheduled = async (data: ScheduledLecture) => {
  try {
    const response = await authInstance.post(
      `/scheduled-lectures/${data.lectureID}`,
      data
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 409) {
          return error.response.data.message;
        } else {
          return "예상치 못한 오류가 발생했습니다. 관리자에게 문의하세요.";
        }
      } else {
        console.error("No response received from server");
        return "서버 응답 없음: 서버 상태를 확인해 주세요.";
      }
    } else {
      console.error("Non-Axios error occurred:", error);
      return "예상치 못한 오류가 발생했습니다.";
    }
  }
};

export const fetchGetScheduled = async () => {
  try {
    const response = await authInstance.get(`/scheduled-lectures`);
    return response ? response.data.data : [];
  } catch (error) {
    return [];
  }
};

export const fetchDeleteScheduled = async (lectureID: number) => {
  await authInstance.delete(`/scheduled-lectures/${lectureID}`);
};

export const fetchUpdateScheduled = async (data: UpdateProps) => {
  await authInstance.put(`/scheduled-lectures/${data.lectureID}`, data);
};
