import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoDataService from "../services/todos";
import { useAuthContext } from "../context/AuthContext";
import type { FormEvent } from "react";
import type { paths } from "../types/api";

type CreateTodoRequest =
  paths["/api/v1/todos/"]["post"]["requestBody"]["content"]["application/json"];
type CreateTodoRequestData = Pick<CreateTodoRequest, "title" | "memo">;

function AddTodo() {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { token } = useAuthContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setError("認証情報がありません。再ログインしてください。");
      return;
    }

    const data: CreateTodoRequestData = { title, memo };

    try {
      await TodoDataService.createTodo(data, token);
      setError(null);
      navigate("/todos");
    } catch (err) {
      console.error("Error creating todo:", err);
      setError("Todoの追加に失敗しました。");
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

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddTodo;
