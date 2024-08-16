import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { InputField, Form, Link, Button } from "../../components";
import AuthController from "../../controllers/auth";
import { toast } from "react-toastify";

interface SignInProps {
  alterSignIn: () => void;
}

export function SignIn({ alterSignIn }: SignInProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({ email: "", password: "" });
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

    setLoading(true);

    const response = await AuthController.login({
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
    setLoading(false);

    navigate("/home");
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
        <Button type="submit" text="Entrar" loading={loading} />
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
