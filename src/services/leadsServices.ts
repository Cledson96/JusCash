import APIConnector from "../api/db";
import AuthService from "../services/auth";

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

interface LeadResponse {
  success: boolean;
  message: string;
  data?: Lead[];
}

interface LeadsService {
  getLeads: () => Promise<LeadResponse>;
  addLead: (lead: Omit<Lead, "id">) => Promise<LeadResponse>;
  updateLead: (lead: Lead) => Promise<LeadResponse>;
}

const LeadsService: LeadsService = {
  getLeads: async (): Promise<LeadResponse> => {
    try {
      const decodedToken = AuthService.decodeToken();
      if (!decodedToken) {
        return { success: false, message: "Usuário não autenticado." };
      }

      const { storedUserId } = decodedToken;

      const user = await APIConnector.getUserById(storedUserId);
      if (!user) {
        return { success: false, message: "Usuário não encontrado." };
      }

      return {
        success: true,
        message: "Leads carregados com sucesso.",
        data: user.leads,
      };
    } catch (error) {
      return { success: false, message: "Erro ao carregar leads." };
    }
  },

  addLead: async (lead: Omit<Lead, "id">): Promise<LeadResponse> => {
    try {
      const decodedToken = AuthService.decodeToken();
      if (!decodedToken) {
        return { success: false, message: "Usuário não autenticado." };
      }

      const { storedUserId } = decodedToken;

      const user = await APIConnector.getUserById(storedUserId);
      if (!user) {
        return { success: false, message: "Usuário não encontrado." };
      }

      await APIConnector.addLeadToUser(storedUserId, lead);

      return {
        success: true,
        message: "Lead adicionado com sucesso.",
      };
    } catch (error) {
      return { success: false, message: "Erro ao adicionar lead." };
    }
  },

  updateLead: async (lead: Lead): Promise<LeadResponse> => {
    try {
      const decodedToken = AuthService.decodeToken();
      if (!decodedToken) {
        return { success: false, message: "Usuário não autenticado." };
      }

      const { storedUserId } = decodedToken;

      const user = await APIConnector.getUserById(storedUserId);
      if (!user) {
        return { success: false, message: "Usuário não encontrado." };
      }

      await APIConnector.updateLeadForUser(storedUserId, lead);

      return {
        success: true,
        message: "Lead atualizado com sucesso.",
      };
    } catch (error) {
      return { success: false, message: "Erro ao atualizar lead." };
    }
  },
};

export default LeadsService;
