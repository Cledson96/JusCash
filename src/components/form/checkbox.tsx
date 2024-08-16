import React from "react";
import styled from "styled-components";

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  style?: "primary" | "gray";
  disabled?: boolean;
}

export function CheckboxField({
  id,
  label,
  checked,
  onChange,
  required = false,
  style = "primary",
  disabled = false,
}: CheckboxFieldProps) {
  return (
    <FormGroup>
      <CheckboxContainer>
        <CheckboxInput
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <CheckboxLabel htmlFor={id} styleType={style} disabled={disabled}>
          {label}
          {required && <span>*</span>}
        </CheckboxLabel>
      </CheckboxContainer>
    </FormGroup>
  );
}

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  accent-color: ${({ disabled }) => (disabled ? "#A9A9A9" : "#0194be")};
`;

const CheckboxLabel = styled.label<{
  styleType: "primary" | "gray";
  disabled?: boolean;
}>`
  font-size: 15px;
  color: ${({ disabled, styleType }) =>
    disabled ? "#A9A9A9" : styleType === "primary" ? "#072854" : "#808080"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  span {
    color: ${({ styleType }) => (styleType === "primary" ? "red" : "#808080")};
    margin-left: 5px;
  }
`;
