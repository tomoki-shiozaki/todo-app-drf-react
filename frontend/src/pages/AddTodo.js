import React, { useState } from "react";
import TodoDataService from "../services/todos";
import { useAuthContext } from "../context/AuthContext";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const { token } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { title, memo };

    try {
      const result = await TodoDataService.createTodo(data, token);
      setMessage("Todoを追加しました！");
      setError(null);
      setTitle("");
      setMemo("");
      console.log("Created todo:", result);
    } catch (err) {
      console.error("Error creating todo:", err);
      setError("Todoの追加に失敗しました。");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>新しいTodoを追加</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル：</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>メモ：</label>
          <br />
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
        </div>

        <button type="submit">追加</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddTodo;
