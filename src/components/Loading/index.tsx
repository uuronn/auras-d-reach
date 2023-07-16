import { css, keyframes } from "@emotion/react"

function Loading() {
    const whole = css`
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    `
    const lotate =keyframes`
        100%{
            transform: rotate(360deg);
        }
    `
    const load = css`
        width: 50px;
        height:50px;
        border: 6px solid #ddd;
        border-radius: 50%;
        border-right-color: #111;
        animation:${lotate} 1s ease infinite;
    `
  return (
    <div css={whole}>
        <div css={load}></div>
    </div>
  )
}

export default Loading