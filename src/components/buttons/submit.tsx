import styled from "styled-components";

interface SubmitProps {
  text: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
}

export function Submit({ text, type = "submit", onClick }: SubmitProps) {
  return (
    <SubmitButton type={type} onClick={onClick}>
      {text}
    </SubmitButton>
  );
}

const SubmitButton = styled.button`
  padding: 10px 20px;
  width: min-content;
  font-size: 16px;
  font-weight: 500;
  background-color: #28e056;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #00ff37;
  }
`;
