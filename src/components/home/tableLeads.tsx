import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LeadController from "../../controllers/leadController";
import { ModalLead } from "../../components";

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

interface TableLeadsProps {
  refresh: boolean;
  refreshLeads: () => void;
}

export function TableLeads({ refresh, refreshLeads }: TableLeadsProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadSelected, setLeadSelected] = useState<Lead | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const getLeads = async () => {
      const response = await LeadController.getLeads();
      if (response.success) {
        setLeads(response.data || []);
      }
    };
    getLeads();
  }, [refresh]);

  const handleDrop = async (
    e: React.DragEvent<HTMLTableCellElement>,
    status: "confirmed" | "analysis"
  ) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    const lead = leads.find((l) => l.id === leadId);
    if (lead) {
      let newStatus: "confirmed" | "analysis" | null = null;
      if (lead.status === "potential" && status === "confirmed") {
        newStatus = "confirmed";
      } else if (lead.status === "confirmed" && status === "analysis") {
        newStatus = "analysis";
      }

      if (newStatus) {
        const updatedLead = { ...lead, status: newStatus };
        await LeadController.updateLead(updatedLead);
        refreshLeads();
      }
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLTableCellElement>,
    leadId: string
  ) => {
    e.dataTransfer.setData("text/plain", leadId);
  };

  const handleLeadClick = (lead: Lead) => {
    setLeadSelected(lead);
    openModal();
  };

  const renderRows = () => {
    return leads.map((lead, index) => (
      <TableRow key={lead.id} isEven={index % 2 === 0}>
        <TableCell
          draggable={lead.status === "potential"}
          onDragStart={(e) => handleDragStart(e, lead.id)}
          isDraggable={lead.status === "potential"}
          onClick={() => handleLeadClick(lead)}
        >
          {lead.status === "potential" ? lead.name : ""}
        </TableCell>
        <TableCell
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "confirmed")}
          draggable={lead.status === "confirmed"}
          onDragStart={(e) => handleDragStart(e, lead.id)}
          isDraggable={lead.status === "confirmed"}
          onClick={() => handleLeadClick(lead)}
        >
          {lead.status === "confirmed" ? lead.name : ""}
        </TableCell>
        <TableCell
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "analysis")}
          isDraggable={lead.status === "analysis"}
          onClick={() => handleLeadClick(lead)}
        >
          {lead.status === "analysis" ? lead.name : ""}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <ModalLead
        type="readLead"
        isOpen={isOpen}
        onClose={closeModal}
        refreshLeads={refreshLeads}
        lead={leadSelected}
      />
      <TableContainer>
        <Table>
          <thead>
            <TableHeader>
              <TableHeaderCell>Cliente Potencial</TableHeaderCell>
              <TableHeaderCellMiddle>Dados Confirmados</TableHeaderCellMiddle>
              <TableHeaderCell>Análise do Lead</TableHeaderCell>
            </TableHeader>
          </thead>
          <tbody>{renderRows()}</tbody>
        </Table>
      </TableContainer>
    </>
  );
}

const TableContainer = styled.div`
  width: 100%;
  max-width: 570px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const TableHeader = styled.tr`
  background-color: white;
  color: #808080;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
`;

const TableHeaderCellMiddle = styled(TableHeaderCell)`
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;

const TableRow = styled.tr<{ isEven: boolean }>`
  background-color: ${({ isEven }) => (isEven ? "#f0ecec" : "white")};
  margin: 5px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td<{ isDraggable: boolean }>`
  padding: 15px;
  color: #494949;
  font-weight: 700;
  text-align: center;
  cursor: ${({ isDraggable }) => (isDraggable ? "pointer" : "default")};
`;
