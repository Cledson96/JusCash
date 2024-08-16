import { v4 as uuidv4 } from "uuid";

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

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  leads: Lead[];
}

interface Database {
  users: User[];
}

const LOCAL_STORAGE_KEY = "DB_JusCash";

const APIConnector = {
  connect: async () => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!db) {
      const initialDB: Database = {
        users: [],
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDB));
    }
  },

  getDatabase: async (): Promise<Database> => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    return db ? JSON.parse(db) : { users: [] };
  },

  saveDatabase: async (db: Database): Promise<void> => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  },

  addUser: async (user: Omit<User, "id">): Promise<void> => {
    const db = await APIConnector.getDatabase();
    const newUser = { ...user, id: uuidv4() };
    db.users.push(newUser);
    await APIConnector.saveDatabase(db);
  },

  getUserByEmail: async (email: string): Promise<User | undefined> => {
    const db = await APIConnector.getDatabase();
    return db.users.find((user) => user.email === email);
  },
  getUserById: async (id: string): Promise<User | undefined> => {
    const db = await APIConnector.getDatabase();
    return db.users.find((user) => user.id === id);
  },
  removeUser: async (userId: string): Promise<void> => {
    const db = await APIConnector.getDatabase();
    db.users = db.users.filter((user) => user.id !== userId);
    await APIConnector.saveDatabase(db);
  },

  addLeadToUser: async (
    userId: string,
    lead: Omit<Lead, "id">
  ): Promise<void> => {
    const db = await APIConnector.getDatabase();
    const user = db.users.find((user) => user.id === userId);
    if (user) {
      const newLead = { ...lead, id: uuidv4() };
      user.leads.push(newLead);
      await APIConnector.saveDatabase(db);
    }
  },

  getLeadsByUserId: async (userId: string): Promise<Lead[]> => {
    const db = await APIConnector.getDatabase();
    const user = db.users.find((user) => user.id === userId);
    return user ? user.leads : [];
  },

  removeLeadFromUser: async (userId: string, leadId: string): Promise<void> => {
    const db = await APIConnector.getDatabase();
    const user = db.users.find((user) => user.id === userId);
    if (user) {
      user.leads = user.leads.filter((lead) => lead.id !== leadId);
      await APIConnector.saveDatabase(db);
    }
  },
};

export default APIConnector;
