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
  style?: "primary" | "gray";
  disabled?: boolean;
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
  style = "primary",
  disabled = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const limitedValue = rawValue.slice(0, 11);

    let formattedValue = limitedValue;

    if (limitedValue.length > 2 && limitedValue.length <= 7) {
      formattedValue = limitedValue.replace(/^(\d{2})(\d)/, "($1) $2");
    } else if (limitedValue.length > 7) {
      formattedValue = limitedValue.replace(
        /^(\d{2})(\d{5})(\d{0,4})$/,
        "($1) $2-$3"
      );
    }

    if (onChange) {
      e.target.value = formattedValue;
      onChange(e);
    }
  };

  const renderInput = () => {
    const commonProps = {
      id,
      value,
      onChange: type === "tel" ? handleTelChange : onChange,
      required,
      pattern,
      title,
      disabled,
    };

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

      case "tel":
        return (
          <Input {...commonProps} type="tel" placeholder="(99) 99999-9999" />
        );

      default:
        return <Input {...commonProps} type={type} />;
    }
  };

  return (
    <FormGroup>
      <Label htmlFor={id} required={required} styleType={style}>
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

const Label = styled.label<{
  required?: boolean;
  styleType: "primary" | "gray";
}>`
  position: absolute;
  top: -22px;
  left: 0;
  font-size: 15px;
  color: ${({ styleType }) =>
    styleType === "primary" ? "#072854" : "#808080"};
  font-weight: 600;

  &:after {
    content: ${({ required }) => (required ? "' *'" : "''")};
    color: ${({ styleType }) => (styleType === "primary" ? "red" : "#808080")};
  }
`;

const Input = styled.input<{ disabled?: boolean }>`
  width: 100%;
  padding: 8px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 10px;
  box-sizing: border-box;
  background-color: ${({ disabled }) => (disabled ? "#A9A9A9" : "white")};
  color: ${({ disabled }) => (disabled ? "#000000" : "inherit")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};

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
