import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log("status", res.status);

      const data = await res.json();
      console.log("DATA", data);

      if (!res.ok) {
        throw new Error(data.message || "Error en el login");
      }

      // ⚠️ Vulnerable (intencional)
      localStorage.setItem("token", data.token);

      //redireccion
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el login", error);
      alert("Error en el login: " + error.message);
    }
  };

  return (
    <div className="page page-login">
      <div className="card">
        <h2>Inicia sesión</h2>
        <p className="subtitle">
          Accede con tu usuario y contraseña para entrar al dashboard seguro.
        </p>

        <div className="form-group">
          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn primary" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
