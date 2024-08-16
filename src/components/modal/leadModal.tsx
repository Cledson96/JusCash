import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Button, InputField, Form, CheckboxField } from "../../components";
import LeadController from "../../controllers/leadController";
import { toast } from "react-toastify";
interface Opportunity {
  name: string;
  checked: boolean;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  tel: string;
  status: "potential" | "confirmed" | "analysis";
  opportunities: Opportunity[];
}
interface ModalProps {
  type: "newLead" | "readLead";
  isOpen: boolean;
  onClose: () => void;
  refreshLeads: () => void;
  lead?: Lead;
}

export function ModalLead({
  type,
  isOpen,
  onClose,
  refreshLeads,
  lead,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
  });
  const [opportunity, setOpportunity] = useState([
    { name: "Todos", checked: true },
    { name: "Honorários Sucumbenciais", checked: true },
    { name: "Honorários Contratuais", checked: true },
    { name: "Honorários Dativos", checked: true },
    { name: "Crédito do Autor", checked: true },
  ]);
  useEffect(() => {
    if (type === "readLead" && lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        tel: lead.tel,
      });
      setOpportunity(lead.opportunities);
    }
  }, [type, lead]);
  const handleChangeOpportunity = (index: number) => {
    setOpportunity((prevData) => {
      const updatedOpportunities = prevData.map((item, i) => {
        if (index === 0) {
          return { ...item, checked: !prevData[0].checked };
        } else if (i === index) {
          return { ...item, checked: !item.checked };
        } else if (i === 0 && !item.checked) {
          return { ...item, checked: false };
        }
        return item;
      });

      if (index !== 0) {
        const allChecked = updatedOpportunities
          .slice(1)
          .every((item) => item.checked);
        updatedOpportunities[0].checked = allChecked;
      }

      return updatedOpportunities;
    });
  };

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      tel: "",
    });
    setOpportunity([
      { name: "Todos", checked: true },
      { name: "Honorários Sucumbenciais", checked: true },
      { name: "Honorários Contratuais", checked: true },
      { name: "Honorários Dativos", checked: true },
      { name: "Crédito do Autor", checked: true },
    ]);
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

    const response = await LeadController.addLead({
      name: formData.name,
      email: formData.email,
      tel: formData.tel,
      status: "potential",
      opportunities: opportunity,
    });
    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }
    toast.success(response.message);
    resetForm();
    refreshLeads();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{type === "newLead" ? "Novo Lead" : "Lead"}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Content>
          <Title>Dados do Lead</Title>

          <Form onSubmit={handleSubmit}>
            <FormContainer>
              <InputField
                id="name"
                label="Nome completo"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                style="gray"
                disabled={type === "readLead"}
              />
              <InputField
                id="email"
                label="E-mail"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                style="gray"
                disabled={type === "readLead"}
              />
              <InputField
                id="tel"
                label="Telefone"
                type="tel"
                value={formData.tel}
                onChange={handleChange}
                required
                style="gray"
                disabled={type === "readLead"}
              />
              {opportunity.map((opportunity, index) => (
                <CheckboxField
                  key={index}
                  id={opportunity.name}
                  label={opportunity.name}
                  checked={opportunity.checked}
                  onChange={() => handleChangeOpportunity(index)}
                  style="gray"
                  disabled={type === "readLead"}
                />
              ))}
            </FormContainer>
            <Footer>
              <Button
                text="Cancelar"
                type="button"
                onClick={onClose}
                color="clean"
                loading={loading}
              />
              {type === "newLead" && (
                <Button
                  text="Salvar"
                  type="submit"
                  color="primary"
                  loading={loading}
                />
              )}
            </Footer>
          </Form>
        </Content>
      </ModalContainer>
    </Overlay>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 5px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
`;

const Header = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #666;
  }
`;

const Content = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Footer = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  width: 300px;
`;
