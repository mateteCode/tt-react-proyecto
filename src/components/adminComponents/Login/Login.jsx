// src/components/adminComponents/Login/Login.jsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(formData.email, formData.password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Credenciales incorrectas o error de conexión.");
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="btn primary">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
