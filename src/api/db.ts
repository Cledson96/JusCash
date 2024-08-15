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
  connect: () => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!db) {
      const initialDB: Database = {
        users: [],
        leads: [],
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDB));
    }
  },

  getDatabase: (): Database => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    return db ? JSON.parse(db) : { users: [], leads: [] };
  },

  saveDatabase: (db: Database) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  },

  addUser: (user: User) => {
    const db = APIConnector.getDatabase();
    db.users.push(user);
    APIConnector.saveDatabase(db);
  },

  getUserByEmail: (email: string): User | undefined => {
    const db = APIConnector.getDatabase();
    return db.users.find((user) => user.email === email);
  },

  removeUser: (userId: string) => {
    const db = APIConnector.getDatabase();
    db.users = db.users.filter((user) => user.id !== userId);
    APIConnector.saveDatabase(db);
  },

  addLead: (lead: Lead) => {
    const db = APIConnector.getDatabase();
    db.leads.push(lead);
    APIConnector.saveDatabase(db);
  },

  getLeads: (): Lead[] => {
    const db = APIConnector.getDatabase();
    return db.leads;
  },

  removeLead: (leadId: string) => {
    const db = APIConnector.getDatabase();
    db.leads = db.leads.filter((lead) => lead.id !== leadId);
    APIConnector.saveDatabase(db);
  },
};

export default APIConnector;
