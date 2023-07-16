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
  justify-content: center;
`;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button css={button} {...props}>
      {children}
    </button>
  );
};
