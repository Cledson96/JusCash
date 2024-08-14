import styled from "styled-components";

interface LinkProps {
  text: string;
  onClick: () => void;
}

export function Link({ text, onClick }: LinkProps) {
  return <StyledLink onClick={onClick}>{text}</StyledLink>;
}

const StyledLink = styled.p`
  color: #072854;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;
