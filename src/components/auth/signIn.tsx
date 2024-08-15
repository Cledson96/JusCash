import React, { useState } from "react";
import styled from "styled-components";
import { InputField, Form, Link, Submit } from "../../components";

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
      <ButtonCenter>
        <Submit type="submit" text="Entrar" />
      </ButtonCenter>
    </Form>
  );
}

const TextEnd = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 25px;
  margin-top: 10px;
`;

const ButtonCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
