import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoDataService from "../services/todos"; // 既存のサービスに詳細取得、更新、削除メソッドを追加
import { useAuthContext } from "../context/AuthContext";

function TodoDetail() {
  const { id } = useParams();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const data = await TodoDataService.getTodoById(id, token);
        setTodo(data);
        setTitle(data.title);
        setMemo(data.memo);
      } catch (err) {
        setError("Todoの取得に失敗しました。");
      }
    }
    fetchTodo();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      await TodoDataService.updateTodo(id, { title, memo }, token);
      navigate("/todos");
    } catch (err) {
      setError("更新に失敗しました。");
    }
  };

  const handleDelete = async () => {
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
