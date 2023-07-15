import { css } from "@emotion/react";
import { useState } from "react";
import { useLogout } from "~/pages/auth/login/hooks/useLogout";

function Logout() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const logoutStyle = css`
    padding: 11px 16px;
    border-radius: 999px;
    border: 1px solid #111;
    background-color: ${isHover ? "#eee" : ""};
  `;

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <button
      css={logoutStyle}
      onClick={useLogout}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      ログアウト
    </button>
  );
}

export default Logout;
