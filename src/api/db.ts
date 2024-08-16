interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
}

interface Database {
  users: User[];
  leads: Lead[];
}

const LOCAL_STORAGE_KEY = "DB_JusCash";

const APIConnector = {
  connect: async () => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!db) {
      const initialDB: Database = {
        users: [],
        leads: [],
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDB));
    }
  },

  getDatabase: async (): Promise<Database> => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    return db ? JSON.parse(db) : { users: [], leads: [] };
  },

  saveDatabase: async (db: Database): Promise<void> => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  },

  addUser: async (user: User): Promise<void> => {
    const db = await APIConnector.getDatabase();
    db.users.push(user);
    await APIConnector.saveDatabase(db);
  },

  getUserByEmail: async (email: string): Promise<User | undefined> => {
    const db = await APIConnector.getDatabase();
    return db.users.find((user) => user.email === email);
  },

  removeUser: async (userId: string): Promise<void> => {
    const db = await APIConnector.getDatabase();
    db.users = db.users.filter((user) => user.id !== userId);
    await APIConnector.saveDatabase(db);
  },

  addLead: async (lead: Lead): Promise<void> => {
    const db = await APIConnector.getDatabase();
    db.leads.push(lead);
    await APIConnector.saveDatabase(db);
  },

  getLeads: async (): Promise<Lead[]> => {
    const db = await APIConnector.getDatabase();
    return db.leads;
  },

  removeLead: async (leadId: string): Promise<void> => {
    const db = await APIConnector.getDatabase();
    db.leads = db.leads.filter((lead) => lead.id !== leadId);
    await APIConnector.saveDatabase(db);
  },
};

export default APIConnector;
