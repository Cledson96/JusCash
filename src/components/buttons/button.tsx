import styled, { keyframes, css } from "styled-components";
import React from "react";

interface ButtonProps {
  text: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  loading?: boolean;
  color?: "success" | "primary" | "clean";
  icon?: React.ReactNode;
}

export function Button({
  text,
  type = "submit",
  onClick,
  loading = false,
  color = "success",
  icon,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={loading}
      color={color}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          {text}
        </>
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ color: "success" | "primary" | "clean" }>`
  padding: 10px 30px;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${(props) =>
    props.color === "success" &&
    css`
      background-color: #23a343;
      color: white;
      padding: 10px 20px;
      &:hover {
        background-color: #169231;
      }
    `}

  ${(props) =>
    props.color === "primary" &&
    css`
      background-color: #0194be;
      color: white;

      &:hover {
        background-color: #017da3;
      }
    `}

  ${(props) =>
    props.color === "clean" &&
    css`
      background-color: white;
      color: #555;
      border: 1px solid #ccc;

      &:hover {
        background-color: #f9f9f9;
        color: #333;
      }
    `}

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

const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;
