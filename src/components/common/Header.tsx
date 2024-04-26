import styled from "styled-components";
import { theme } from "../../style/theme";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const { isLoggedIn, storeLogout } = useAuthStore();

  return (
    <HeaderStyle>
      <Link to="/">
        <h1 className="logo">로고</h1>
      </Link>

      <nav className="auth">
        {isLoggedIn && (
          <ul>
            <li>
              <Link to="/my-lectures">내 강의</Link>
            </li>
            <li onClick={storeLogout}>로그아웃</li>
          </ul>
        )}
        {!isLoggedIn && (
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/join">회원가입</Link>
            </li>
          </ul>
        )}
      </nav>
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

  a {
    text-decoration: none;
    font-weight: bold;
  }

  ul {
    display: flex;
    gap: 32px;

    li {
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
