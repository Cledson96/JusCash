import styled from "styled-components";

export function Card({ children }: { children: React.ReactNode }) {
  return <StyledCard>{children}</StyledCard>;
}

const StyledCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  width: 90%;
  max-width: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1024px) {
    width: 35%;
  }

  @media (min-width: 1440px) {
    width: 25%;
  }
`;
