import React, { useState } from "react";
import styled from "styled-components";
import { InputField, Form, Link, Submit } from "../../components";

interface SignInProps {
  alterSignIn: () => void;
}

export function SignUp({ alterSignIn }: SignInProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

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
        id="name"
        label="Seu nome completo:"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <InputField
        id="email"
        label="E-mail:"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <InputField
        id="password"
        label="Senha"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
        title="A senha deve possuir ao menos 8 caracteres, contendo ao menos, um caractere especial, um caractere numérico, e um caractere alfanumérico."
      />
      <InputField
        id="confirmPassword"
        label="Senha"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
        title="A senha deve possuir ao menos 8 caracteres, contendo ao menos, um caractere especial, um caractere numérico, e um caractere alfanumérico."
      />
      <TextEnd>
        <Link
          text="Já possui uma conta? Fazer o login."
          onClick={alterSignIn}
        />
      </TextEnd>
      <ButtonCenter>
        <Submit type="submit" text="Criar conta" />
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
