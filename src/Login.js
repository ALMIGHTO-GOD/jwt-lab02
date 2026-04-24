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
    <div>
      <h2>Login</h2>
      <input
        placeholder="usuario"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
