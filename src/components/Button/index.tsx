import { css } from "@emotion/react";
import { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
}

const button = css`
  padding: 8px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 14px;
  font-size: 16px;
  background: #bebebe;
`;

export const Button = ({ children }: ButtonProps) => {
  return <button css={button}>{children}</button>;
};
