import AuthService from "../services/auth";

interface AuthController {
  register: (req: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{
    success: boolean;
    message: string;
    data?: any;
  }>;
  login: (req: { email: string; password: string }) => Promise<{
    success: boolean;
    message: string;
    data?: any;
  }>;
  isAuthenticated: () => Promise<{ success: boolean }>;
}

const AuthController: AuthController = {
  register: async (req) => {
    const { name, email, password } = req;

    const result = await AuthService.register(name, email, password);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message, data: result.data };
  },

  login: async (req) => {
    const { email, password } = req;

    const result = await AuthService.login(email, password);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message, data: result.data };
  },

  isAuthenticated: async () => {
    const isAuth = await AuthService.isAuthenticated();
    return { success: isAuth };
  },
};

export default AuthController;
