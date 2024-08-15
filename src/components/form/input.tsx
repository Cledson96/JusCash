import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "tel";
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
  title?: string;
}

export function InputField({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  pattern,
  title,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue.replace(
      /^(\d{2})(\d{5})(\d{4})$/,
      "($1) $2-$3"
    );
    if (onChange) {
      e.target.value = formattedValue;
      onChange(e);
    }
  };

  const renderInput = () => {
    switch (type) {
      case "password":
        pattern =
          pattern ||
          "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$";
        title =
          title ||
          "A senha deve possuir ao menos 8 caracteres, contendo ao menos, um caractere especial, um caractere numérico, e um caractere alfanumérico.";
        return (
          <div style={{ position: "relative" }}>
            <Input
              id={id}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              required={required}
              pattern={pattern}
              title={title}
            />
            <IconWrapper onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconWrapper>
          </div>
        );

      case "email":
        return (
          <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            pattern={pattern}
            title={title}
          />
        );

      case "tel":
        return (
          <Input
            id={id}
            type={type}
            value={value}
            onChange={handleTelChange}
            required={required}
            placeholder="(99) 99999-9999"
          />
        );

      default:
        return (
          <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            pattern={pattern}
            title={title}
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
