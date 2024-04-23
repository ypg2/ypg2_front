import styled from "styled-components";
import Button from "../components/common/Button";

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
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;
