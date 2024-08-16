import styled from "styled-components";
import { Button, ModalLead } from "../../components";
import { GoPlus } from "react-icons/go";
import { useState } from "react";

interface NewLeadProps {
  refreshLeads: () => void;
}

export function NewLead({ refreshLeads }: NewLeadProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <StyledBackground>
      <Button
        text="Novo Lead"
        onClick={openModal}
        type="button"
        color="primary"
        icon={<GoPlus size={20} />}
      />
      <ModalLead
        type="newLead"
        isOpen={isOpen}
        onClose={closeModal}
        refreshLeads={refreshLeads}
        key={isOpen ? "open" : "closed"}
      />
    </StyledBackground>
  );
}

const StyledBackground = styled.div`
  width: 90%;
  max-width: 550px;
  display: flex;
  justify-content: flex-end;
  background-color: #f0ecec;
  padding: 10px;
  margin-bottom: 20px;
`;
