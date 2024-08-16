import styled from "styled-components";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function Form({ children, onSubmit }: FormProps) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
