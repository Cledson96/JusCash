import styled from "styled-components";

export function BackgroundAuth({ children }: { children: React.ReactNode }) {
  return <StyledBackgroundAuth>{children}</StyledBackgroundAuth>;
}

const StyledBackgroundAuth = styled.div`
  background-color: #072854;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
