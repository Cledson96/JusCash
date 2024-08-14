import React, { useState } from "react";
import styled from "styled-components";
import { InputField, Form, Link } from "../../components";

export function SignIn() {
  const [formData, setFormData] = useState({ email: "", senha: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        id="email"
        label="E-mail:"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <InputField
        id="senha"
        label="Senha"
        type="password"
        value={formData.senha}
        onChange={handleChange}
        required
      />
      <TextEnd>
        <Link
          text="Não tem uma conta? Cadastre-se."
          onClick={() => console.log("Forgot password")}
        />
      </TextEnd>
      <SubmitButton type="submit">Sign In</SubmitButton>
    </Form>
  );
}

const TextEnd = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
