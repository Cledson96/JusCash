import APIConnector from "../api/db";
import jwt from "jwt-simple";
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
  register: (name: string, email: string, password: string) => AuthResponse;
  login: (email: string, password: string) => AuthResponse;
  isAuthenticated: () => boolean;
  logout: () => void;
}

const AuthService: AuthService = {
  register: (name: string, email: string, password: string): AuthResponse => {
    const existingUser = APIConnector.getUserByEmail(email);

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

    APIConnector.addUser(newUser);
    return {
      success: true,
      message: "Usuário cadastrado com sucesso.",
      data: { userId: newUser.id },
    };
  },

  login: (email: string, password: string): AuthResponse => {
    const user = APIConnector.getUserByEmail(email);

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

    const payload = {
      userId: user.id,
      exp: Date.now() + TOKEN_EXPIRATION,
    };
    const token = jwt.encode(payload, SECRET_KEY);

    localStorage.setItem("auth_token", token);
    return {
      success: true,
      message: "Logado com sucesso.",
      data: { token },
    };
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      return false;
    }

    try {
      const decoded = jwt.decode(token, SECRET_KEY);

      if (decoded.exp < Date.now()) {
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
