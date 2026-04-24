import { useState, useEffect } from "react";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/dashboard", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Dashboard fetch error:", error));
  }, []);

  const addComment = () => {
    setComments([...comments, comment]);
  };

  return (
    <div className="page page-dashboard">
      <div className="card">
        <h2>{message || "Cargando dashboard..."}</h2>
        <p className="subtitle">
          Bienvenido al panel de control seguro de Brian Eduardo Licea
          Langarica.
        </p>

        <div className="form-group">
          <input
            placeholder="Escribe un comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn secondary" onClick={addComment}>
            Agregar comentario
          </button>
        </div>

        <div className="comments">
          {comments.length > 0 ? (
            comments.map((c, i) => (
              <p className="comment" key={i}>
                {c}
              </p>
            ))
          ) : (
            <p className="empty">Aún no hay comentarios.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
