import { useEffect, useState } from "react";
import { mockLectureData } from "../mock/lecture";
import { fetchLectureDetail } from "../api/lectures.api";
import { Lecture } from "../models/lecture.model";

export default function useLectureDetail(id: number) {
  const [lecture, setLecture] = useState(mockLectureData[id]);

  //   useEffect(() => {
  //     fetchLectureDetail(id).then((lecture: Lecture | undefined) =>
  //       lecture !== undefined
  //         ? setLecture(lecture)
  //         : console.log("lectureById 못 받아옴")
  //     );
  //   }, [id]);

  return { lecture };
}
