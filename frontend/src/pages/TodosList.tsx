import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import TodoDataService from "../services/todos";
import { useAuthContext } from "../context/AuthContext";
import type { paths } from "../types/api";
import RequireAuthAlert from "../components/RequireAuthAlert";

type TodosListResponse =
  paths["/api/v1/todos/"]["get"]["responses"]["200"]["content"]["application/json"];

const TodosList = () => {
  const [todos, setTodos] = useState<TodosListResponse>([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) return;

    const retrieveTodos = () => {
      setLoading(true);
      TodoDataService.getAll(token)
        .then((data) => {
          setTodos(data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };

    retrieveTodos();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!token) {
      alert("ログインが必要です。");
      return;
    }

    if (!window.confirm("このTodoを削除してもよろしいですか？")) return;

    try {
      await TodoDataService.deleteTodo(id, token);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete todo.");
    }
  };

  const handleComplete = async (id: number) => {
    if (!token) {
      alert("ログインが必要です。");
      return;
    }

    try {
      await TodoDataService.completeTodo(id, token);
      // 完了トグルがサーバー側で行われるので、ローカルでも反映
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Failed to toggle completion:", error);
      alert("完了状態の切り替えに失敗しました。");
    }
  };

  if (!token) return <RequireAuthAlert />;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">読み込み中...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container>
      {/* 新規追加ボタン */}
      <div className="mb-3">
        <Link to="/todos/create">
          <Button variant="primary">新しいTodoを追加</Button>
        </Link>
      </div>

      {todos.length === 0 ? (
        <Alert variant="info">Todoはありません。</Alert> // Todosがない場合のメッセージ
      ) : (
        todos.map((todo) => (
          <Card key={todo.id} className="mb-3">
            <Card.Body>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>
                <b>メモ：</b> {todo.memo}
              </Card.Text>
              <Card.Text>
                <b>作成日：</b>{" "}
                {new Date(todo.created).toLocaleString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Card.Text>
              <Card.Text>
                <b>状態：</b>{" "}
                <span style={{ color: todo.completed ? "green" : "red" }}>
                  {todo.completed ? "完了" : "未完了"}
                </span>
              </Card.Text>

              <div className="d-flex flex-wrap gap-2 mt-2">
                {/* 完了ボタン */}
                <Button
                  variant={todo.completed ? "secondary" : "success"}
                  onClick={() => handleComplete(todo.id)}
                >
                  {todo.completed ? "未完了に戻す" : "完了にする"}
                </Button>
                {/* 編集ボタン */}
                <Link to={`/todos/${todo.id}`} state={{ currentTodo: todo }}>
                  <Button variant="outline-info">編集</Button>
                </Link>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(todo.id)}
                >
                  削除
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default TodosList;
