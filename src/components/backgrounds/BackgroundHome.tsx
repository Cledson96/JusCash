import styled from "styled-components";
import logo from "../../img/logo.png";

export function BackgroundHome({ children }: { children: React.ReactNode }) {
  return (
    <StyledBackgroundAuth>
      <StyledLogo src={logo} alt="Logo" />
      {children}
    </StyledBackgroundAuth>
  );
}
const StyledLogo = styled.img`
  width: 550px;
`;

const StyledBackgroundAuth = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
