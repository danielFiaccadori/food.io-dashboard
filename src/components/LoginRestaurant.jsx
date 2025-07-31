import { useState } from "react";
import AuthService from "../api/AuthService";
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { Input } from "@headlessui/react";

function LoginRestaurant() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        console.log("Submetendo dados:", formData);

        try {
            const res = await AuthService.login(formData);
            console.log(res.data);
            localStorage.setItem('token', res.data.data.token);
        } catch (err) {
            console.error("Error during account login! (LoginRestaurant::handleSubmit)")
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-1/6 max-w-120 content-center justify-center">
            <form onSubmit={handleSubmit}>

                <div>
                    <img
                        className="w-full"
                        src={logo} />
                </div>

                <Input
                    className="w-full p-3 mb-4 rounded-xl bg-[#22212b] max-w-120 min-w-120 text-[#8b8b94] font-medium"
                    name="email" value={formData.email} onChange={handleChange} placeholder="E-mail*" type="email" />

                <Input
                    className="w-full p-3 mb-4 rounded-xl bg-[#22212b] max-w-120 min-w-120 text-[#8b8b94] font-medium"
                    name="password" value={formData.password} onChange={handleChange} placeholder="Senha*" type="password" />

                <button onClick={() => navigate("/signup")} className="text-[#F37359] underline mt-4 cursor-pointer">
                    Fazer cadastro
                </button>

                <button
                    className="p-4 mt-6 mb-6 min-w-120 rounded-full bg-[#F37359] font-medium cursor-pointer transition hover:scale-102 hover:shadow-xl duration-200"
                    type="submit">Fazer login
                </button>

                <p className="text-[#8b8b94] p-4">Ao continuar, você será automaticamente redirecionado para o dashboard de gerenciamento.</p>
            </form>
        </div>
    );

}

export default LoginRestaurant;