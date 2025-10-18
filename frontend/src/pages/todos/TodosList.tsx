import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import TodoDataService from "../../services/todos";
import { useAuthContext } from "../../context/AuthContext";
import type { paths } from "../../types/api";
import { RequireAuthAlert } from "../../components/auth";
import { ConfirmDeleteModal } from "../../components/todos";
import { Loading } from "../../components/common";

type TodosListResponse =
  paths["/api/v1/todos/"]["get"]["responses"]["200"]["content"]["application/json"];

const TodosList = () => {
  const [todos, setTodos] = useState<TodosListResponse>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // モーダル制御用
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const { token } = useAuthContext();

  // Todo一覧取得
  const fetchTodos = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await TodoDataService.getAll(token);
      setTodos(data);
    } catch (error: any) {
      console.error("Failed to fetch todos:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // 削除処理
  const handleDeleteConfirm = useCallback(async () => {
    if (selectedTodoId === null || !token) return;

    try {
      await TodoDataService.deleteTodo(selectedTodoId, token);
      setTodos((prev) => prev.filter((todo) => todo.id !== selectedTodoId));
      setShowDeleteModal(false);
      setSelectedTodoId(null);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setErrorMessage("削除に失敗しました。");
    }
  }, [selectedTodoId, token]);

  // 完了状態のトグル
  const handleComplete = useCallback(
    async (id: number) => {
      if (!token) {
        setErrorMessage("ログインが必要です。");
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
      } catch (error: any) {
        console.error("Failed to toggle completion:", error);
        setErrorMessage(error.message);
      }
    },
    [token]
  );

  // 未ログイン時
  if (!token) return <RequireAuthAlert />;

  // ローディング中
  if (loading) return <Loading message="Todoを読み込み中..." />;

  return (
    <Container>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h3>Todo一覧</h3>
        {/* 新規追加ボタン */}
        <Link to="/todos/create">
          <Button variant="primary">新しいTodoを追加</Button>
        </Link>
      </div>

      {/* ✅ エラーメッセージ表示 */}
      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage(null)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}

      {/* Todo一覧 */}
      {todos.length === 0 ? (
        <Alert variant="info">Todoはありません。</Alert> // Todosがない場合のメッセージ
      ) : (
        todos.map((todo) => (
          <Card key={todo.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>
                <b>メモ：</b> {todo.memo || "（なし）"}
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

                {/* 削除ボタン（モーダルを開く） */}
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setSelectedTodoId(todo.id);
                    setShowDeleteModal(true);
                  }}
                >
                  削除
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      {/* 削除確認モーダル */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default TodosList;
