import Api from "./Api";

const AuthService = {
    signUp: (data) => Api.post(`/auth/register/restaurant`, data),
    login: (data) => Api.post(`/auth/login`, data)
}

export default AuthService;