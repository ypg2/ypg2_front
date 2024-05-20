export const days = ["월", "화", "수", "목", "금", "토", "일"];
export const initializeSchedule = () => {
  return Array.from({ length: 18 }, () => Array(7).fill(null));
};
export const hours = Array.from({ length: 18 }, (_, i) => String(6 + i));
