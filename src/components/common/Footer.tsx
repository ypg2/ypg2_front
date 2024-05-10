import styled from "styled-components";
import { theme } from "../../style/theme";

export default function Footer() {
  return (
    <FooterStyle>
      <div className="copyright">
        <p>copyright(c), 2024, 마이플래너</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${theme.layout.width.large};
  border-top: 1px solid ${theme.color.border};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .copyright {
    p {
      font-size: 0.75rem;
    }
  }
`;
