import styled from "styled-components";

export function Card({ children }: { children: React.ReactNode }) {
  return <StyledCard>{children}</StyledCard>;
}

const StyledCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
