import React, { useState } from "react";
import styled from "styled-components";
import { InputField, Form, Link, Submit } from "../../components";
import AuthController from "../../controllers/auth";
import { toast } from "react-toastify";
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

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    const response = await AuthController.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }
    toast.success(response.message);
    resetForm();

    setTimeout(() => {
      alterSignIn();
    }, 2000);

    setLoading(false);
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
        label="Senha:"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <InputField
        id="confirmPassword"
        label="Confirme sua senha:"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <TextEnd>
        <Link
          text="Já possui uma conta? Fazer o login."
          onClick={alterSignIn}
        />
      </TextEnd>
      <ButtonCenter>
        <Submit type="submit" text="Criar conta" loading={loading} />
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
