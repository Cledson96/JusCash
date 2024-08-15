import React, { useState } from "react";
import styled from "styled-components";
import { InputField, Form, Link, Submit } from "../../components";

interface SignInProps {
  alterSignIn: () => void;
}

export function SignIn({ alterSignIn }: SignInProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });

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
        id="password"
        label="Senha"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextEnd>
        <Link text="Não tem uma conta? Cadastre-se." onClick={alterSignIn} />
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
