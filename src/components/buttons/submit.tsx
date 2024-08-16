import styled, { keyframes } from "styled-components";

interface SubmitProps {
  text: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  loading?: boolean;
}

export function Submit({
  text,
  type = "submit",
  onClick,
  loading = false,
}: SubmitProps) {
  return (
    <SubmitButton type={type} onClick={onClick} disabled={loading}>
      {loading ? <LoadingSpinner /> : text}
    </SubmitButton>
  );
}

const SubmitButton = styled.button`
  padding: 10px 20px;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
  background-color: #28e056;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #00ff37;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: ${spin} 1s linear infinite;
`;
