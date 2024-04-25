import { useEffect, useState } from "react";
import { QUERYSTRING } from "../constants/querystring";
import { fetchLectures } from "../api/lecture.api";
import { useLocation, useNavigate } from "react-router-dom";
import { Lecture } from "../models/lecture.model";

export const useLectures = () => {
  const navigator = useNavigate();
  const goHome = () => navigator(`/`);
  const location = useLocation();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryID = params.get(QUERYSTRING.CATEGORY_ID);
    const page = params.get(QUERYSTRING.PAGE);
    const limitPoint = params.get(QUERYSTRING.LIMIT);

    const getLectures = async () => {
      try {
        const { meta, data } = await fetchLectures({
          categoryID: categoryID,
          page: page === null ? "1" : page,
          limit: limitPoint === null ? "4" : limitPoint,
        });
        const { totalSize, size } = meta;
        setLectures(data);
        setTotalSize(totalSize);
      } catch (error) {
        alert("잘못된 요청입니다.");
        goHome();
        // 추가 로직 필요
      }
    };
    getLectures();
    // 이렇게 fetching을 해올 수 있음
  }, [location]);

  return { lectures, totalSize };
};
