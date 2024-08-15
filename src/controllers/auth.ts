import AuthService from "../services/auth";

interface AuthController {
  register: (req: { name: string; email: string; password: string }) => {
    success: boolean;
    message: string;
    data?: any;
  };
  login: (req: { email: string; password: string }) => {
    success: boolean;
    message: string;
    data?: any;
  };
}

const AuthController: AuthController = {
  register: (req) => {
    const { name, email, password } = req;

    const result = AuthService.register(name, email, password);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message, data: result.data };
  },

  login: (req) => {
    const { email, password } = req;

    const result = AuthService.login(email, password);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message, data: result.data };
  },
};

export default AuthController;
