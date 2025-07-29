import { useState } from "react";
import AuthService from "../api/AuthService";

function SignUpRestaurant() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        description: "",
        imageUrl: "",
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
        e.preventDefault;

        try {
            const res = await AuthService.signUp(formData);
            console.log(res.data);
        } catch (err) {
            console.error("Error during account registration! (SignUpRestaurant::handleSubmit)")
        }
    }

    return (
    <form onSubmit={handleSubmit}>
      <input 
      className="w-full p-2 mb-4 border rounded"
      name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" required />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Restaurant name" required />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image" />

      <button type="submit">Sign up</button>
    </form>
  );

}

export default SignUpRestaurant;