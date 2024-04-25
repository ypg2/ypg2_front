import styled from "styled-components";
import Button from "../components/common/Button";
import LectureDetail from "./LectureDetail";

export default function Home() {
  return (
    <HomeStyle>
      <div>첫페이지</div>
      <Button size="large" scheme="primary">
        테스트버튼
      </Button>
      <Button size="medium" scheme="normal">
        테스트버튼
      </Button>
      <LectureDetail id={1} /> {/* 눈으로 확인하려고 아무데나 붙여뒀습니다 */}
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;
