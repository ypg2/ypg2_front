import { ReactNode } from "react";
import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { theme } from "../../style/theme";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
}

const LayoutStyle = styled.div`
  width: 100%;
  max-width: ${theme.layout.width.large};
  margin: 0 auto;
  padding: 20px 0;
`;
