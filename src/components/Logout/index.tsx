import { css } from "@emotion/react"
import { useLogout } from "~/pages/auth/login/hooks/useLogout";

const logoutStyle = css`
padding: 11px 16px;
border-radius: 999px;
border:1px solid #111;
`;

function Logout() {
  return (
    <button css={logoutStyle} onClick={useLogout}>ログアウト</button>
  )
}

export default Logout