import Api from "./api";

const AuthService = {
    signUp: (data) => Api.post(`/auth/register/restaurant`, data),
    login: (data) => Api.post(`/auth/login`, data)
}

export default AuthService;