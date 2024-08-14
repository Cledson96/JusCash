import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function InputField({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderInput = () => {
    if (type === "password") {
      return (
        <div>
          <Input
            id={id}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
          />
          <IconWrapper onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </IconWrapper>
        </div>
      );
    } else {
      return (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    }
  };

  return (
    <FormGroup>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {renderInput()}
    </FormGroup>
  );
}
const FormGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
  margin-top: 25px;
`;

const Label = styled.label<{ required?: boolean }>`
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 15px;
  color: #072854;
  font-weight: 600;

  &:after {
    content: ${({ required }) => (required ? "' *'" : "''")};
    color: red;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 10px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
