import styled from "styled-components";
import { theme } from "../../style/theme";

export default function Header() {
  return (
    <HeaderStyle>
      <h1 className="logo">로고</h1>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${theme.layout.width.large};
  border-bottom: 1px solid ${theme.color.background};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: ${theme.color.primary};
  }
`;
