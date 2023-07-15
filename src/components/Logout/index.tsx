import { css } from "@emotion/react";
import { useLogout } from "~/pages/auth/login/hooks/useLogout";

function Logout() {
  const logoutStyle = css`
    &:hover {
      background-color: #eee;
    }
    padding: 11px 16px;
    border-radius: 999px;
    border: 1px solid #111;
    transition: 0.2s;
  `;
  return (
    <button css={logoutStyle} onClick={useLogout}>
      ログアウト
    </button>
  );
}

export default Logout;
