import { styled } from "styled-components";
import { ButtonScheme, ButtonSize, theme } from "../../style/theme";
import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isloading?: boolean; // 이미 버튼 눌러서 실행중이면 또 실행하지 않게
}

export default function Button({
  children,
  size,
  scheme,
  disabled,
  isloading,
  ...props
}: Props) {
  return (
    <ButtonStyle
      size={size}
      scheme={scheme}
      disabled={disabled}
      isloading={isloading}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({ size }) => theme.button[size].fontSize};
  padding: ${({ size }) => theme.button[size].padding};
  color: ${({ scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ scheme }) =>
    theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) =>
    disabled ? "none" : "auto"}; // disabled면 non-clickable
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};
`;
