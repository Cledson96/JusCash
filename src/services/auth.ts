import APIConnector from "../api/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const SECRET_KEY = "12345";
const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface AuthService {
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  isAuthenticated: () => Promise<boolean>;
  logout: () => void;
}

const AuthService: AuthService = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const existingUser = await APIConnector.getUserByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: "Usuário já cadastrado.",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    };

    await APIConnector.addUser(newUser);
    return {
      success: true,
      message: "Usuário cadastrado com sucesso.",
      data: { userId: newUser.id },
    };
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const user = await APIConnector.getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "Senha ou email invalido.",
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Senha ou email invalido.",
      };
    }

    const expirationTime = Date.now() + TOKEN_EXPIRATION;
    const tokenData = `${user.id}:${expirationTime}`;
    const token = btoa(`${tokenData}:${SECRET_KEY}`);

    localStorage.setItem(
      "auth_token",
      JSON.stringify({ token, expirationTime })
    );

    return {
      success: true,
      message: "Logado com sucesso.",
      data: { token },
    };
  },

  isAuthenticated: async (): Promise<boolean> => {
    const tokenData = localStorage.getItem("auth_token");

    if (!tokenData) {
      return false;
    }

    const { token, expirationTime } = JSON.parse(tokenData);

    if (Date.now() > expirationTime) {
      localStorage.removeItem("auth_token");
      return false;
    }

    try {
      const decodedToken = atob(token);
      const [storedUserId, storedExpiration, secretKey] =
        decodedToken.split(":");

      if (secretKey !== SECRET_KEY) {
        localStorage.removeItem("auth_token");
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem("auth_token");
      return false;
    }
  },

  logout: (): void => {
    localStorage.removeItem("auth_token");
  },
};

export default AuthService;
