import styled from "styled-components";
import { useLectures } from "../hooks/useLectures";
import LecturesFiliter from "../components/Lectures/LecturesFilter";
import LecturesPagination from "../components/Lectures/LecturesPagination";
import LecturesList from "../components/Lectures/LecturesList";
import LecturesLimit from "../components/Lectures/LecturesLimit";

export default function Home() {
  const { lectures, totalSize } = useLectures();
  console.log(lectures);
  return (
    <HomeStyle>
      <LecturesFiliter />
      <LecturesLimit />
      <LecturesList lectures={lectures} />
      <LecturesPagination totalSize={totalSize} />
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;
