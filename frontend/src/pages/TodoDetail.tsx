import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoDataService from "../services/todos"; // 詳細取得、更新、削除ロジック
import { useAuthContext } from "../context/AuthContext";
import type { components, paths } from "../types/api";

type Todo = components["schemas"]["Todo"];

type UpdateTodoRequest =
  paths["/api/v1/todos/{id}/"]["put"]["requestBody"]["content"]["application/json"];
type UpdateTodoRequestData = Pick<UpdateTodoRequest, "title" | "memo">;

function TodoDetail() {
  const { id } = useParams();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // id が undefined の場合は何もしない
    if (!token) return; // token が null の場合は何もしない

    const todoId: string = id; // string に型を固定
    const authToken: string = token;

    async function fetchTodo() {
      try {
        const data = await TodoDataService.getTodoById(todoId, authToken);
        setTodo(data);
        setTitle(data.title);
        setMemo(data.memo ?? "");
      } catch (err) {
        setError("Todoの取得に失敗しました。");
      }
    }
    fetchTodo();
  }, [id, token]);

  const handleUpdate = async () => {
    if (!id || !token) return;

    const data: UpdateTodoRequestData = { title, memo };

    try {
      await TodoDataService.updateTodo(id, data, token);
      navigate("/todos");
    } catch (err) {
      setError("更新に失敗しました。");
    }
  };

  const handleDelete = async () => {
    if (!id || !token) return;

    try {
      await TodoDataService.deleteTodo(id, token);
      navigate("/todos");
    } catch (err) {
      setError("削除に失敗しました。");
    }
  };

  if (!todo) return <div>読み込み中...</div>;

  return (
    <div>
      <h2>Todo詳細</h2>
      <label>タイトル：</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>メモ：</label>
      <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
      <br />
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleDelete}>削除</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TodoDetail;
