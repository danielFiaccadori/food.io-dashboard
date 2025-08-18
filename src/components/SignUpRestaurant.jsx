import { useState } from "react";
import AuthService from "../api/AuthService";
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { Input } from "@headlessui/react";

function SignUpRestaurant() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        isOpen: true,
        role: "RESTAURANT"
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: val
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submiting data:", formData);

        try {
            await AuthService.signUp(formData);
            console.log("Successfully registered");

            const loginRes = await AuthService.login({
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('token', loginRes.data.data.token);

            navigate("/dashboard/home");
        } catch (err) {
            console.error("Error during register or login! (SignUpRestaurant::handleSubmit)", err);
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-1/6 max-w-120 content-center justify-center">
            <form onSubmit={handleSubmit}>

                <div className="flex-1 content-center justify-center">
                    <img
                        className="w-full"
                        src={logo} />
                </div>

                <Input
                    className="w-full p-3 mb-4 rounded-xl bg-[#22212b] max-w-120 min-w-120 text-[#8b8b94] font-medium"
                    name="username" value={formData.username} onChange={handleChange} placeholder="Nome de usuário*" required/>

                <Input
                    className="w-full p-3 mb-4 rounded-xl bg-[#22212b] max-w-120 min-w-120 text-[#8b8b94] font-medium"
                    name="email" value={formData.email} onChange={handleChange} placeholder="E-mail*" type="email" required/>

                <Input
                    className="w-full p-3 mb-4 rounded-xl bg-[#22212b] max-w-120 min-w-120 text-[#8b8b94] font-medium"
                    name="password" value={formData.password} onChange={handleChange} placeholder="Senha*" type="password" required/>

                <Input
                    className="w-full p-3 mb-4 rounded-xl bg-[#22212b] max-w-120 min-w-120 text-[#8b8b94] font-medium"
                    name="name" value={formData.name} onChange={handleChange} placeholder="Nome do restaurante*" required/>

                <button onClick={() => navigate("/login")} className="text-[#F37359] underline mt-4 cursor-pointer">
                    Já tem uma conta?
                </button>

                <button
                    className="p-4 mt-6 mb-6 min-w-120 rounded-full bg-[#F37359] font-medium cursor-pointer transition hover:scale-102 hover:shadow-xl duration-200"
                    type="submit">Cadastrar agora
                </button>

                <p className="text-[#8b8b94] p-4">Ao continuar, você será automaticamente redirecionado para o dashboard de gerenciamento.</p>
            </form>
        </div>
    );

}

export default SignUpRestaurant;