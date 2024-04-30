import { useEffect, useState } from "react";
import { fetchLectureDetail } from "../api/lecture.api";
import { Lecture } from "../models/lecture.model";

export default function useLectureDetail(id: number) {
  const [lecture, setLecture] = useState<Lecture>();

  useEffect(() => {
    fetchLectureDetail(id).then((lecture: Lecture | undefined) => {
      if (lecture) {
        setLecture(lecture);
      }
    });
  }, [id]);

  return { lecture };
}
