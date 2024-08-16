import styled from "styled-components";
import backgroundImage from "../../img/fundo.jpg";

export function BackgroundAuth({ children }: { children: React.ReactNode }) {
  return <StyledBackgroundAuth>{children}</StyledBackgroundAuth>;
}

const StyledBackgroundAuth = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 40, 84, 0.5);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;
