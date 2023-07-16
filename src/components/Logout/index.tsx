import { css } from "@emotion/react";
import { useLogout } from "~/pages/auth/login/hooks/useLogout";
import LogoutImg from "../../assets/door.svg";

function Logout() {
  const logoutStyle = css`
    &:hover {
      background-color: #eee;
    }
    padding: 11px 16px;
    border-radius: 999px;
    border: 1px solid #111;
    transition: 0.2s;
    display: flex;
    align-items: center;
  `;
  const ImgStyle = css`
    display: block;
    height: 20px;
    margin-right: 5px;
  `
  return (
    <button css={logoutStyle} onClick={useLogout}>
      <img src={LogoutImg} alt="" css={ImgStyle}/>
      <p>ログアウト</p>
    </button>
  );
}

export default Logout;
