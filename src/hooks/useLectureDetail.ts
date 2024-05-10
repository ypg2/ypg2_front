import { useEffect, useState } from "react";
import { fetchLectureDetail } from "../api/lecture.api";
import { LectureDetail } from "../models/lecture.model";

export default function useLectureDetail(id: number) {
  const [lecture, setLecture] = useState<LectureDetail>();

  useEffect(() => {
    fetchLectureDetail(id).then((lecture: LectureDetail | undefined) => {
      if (lecture) {
        setLecture(lecture);
      }
    });
  }, [id]);

  return { lecture };
}
