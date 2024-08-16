import LeadsService from "../services/leadsServices";

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
interface LeadsController {
  getLeads: () => Promise<{
    success: boolean;
    message: string;
    data?: Lead[];
  }>;
  addLead: (req: {
    name: string;
    email: string;
    tel: string;
    status: "potential" | "confirmed" | "analysis";
    opportunities: Opportunity[];
  }) => Promise<{
    success: boolean;
    message: string;
    data?: any;
  }>;
  updateLead: (req: {
    id: string;
    name: string;
    email: string;
    tel: string;
    status: "potential" | "confirmed" | "analysis";
    opportunities: Opportunity[];
  }) => Promise<{
    success: boolean;
    message: string;
    data?: any;
  }>;
}

const LeadsController: LeadsController = {
  getLeads: async () => {
    const result = await LeadsService.getLeads();

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message, data: result.data };
  },

  addLead: async (req) => {
    const { name, email, tel, status, opportunities } = req;

    const lead = {
      id: "",
      name,
      email,
      tel,
      status,
      opportunities,
    };

    const result = await LeadsService.addLead(lead);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message, data: result.data };
  },

  updateLead: async (req) => {
    const { id, name, email, tel, status, opportunities } = req;

    const lead = {
      id,
      name,
      email,
      tel,
      status,
      opportunities,
    };

    const result = await LeadsService.updateLead(lead);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message, data: result.data };
  },
};

export default LeadsController;
