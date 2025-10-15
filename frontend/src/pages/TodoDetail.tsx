import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoDataService from "../services/todos"; // 詳細取得、更新、削除ロジック
import { useAuthContext } from "../context/AuthContext";
import type { components, paths } from "../types/api";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import RequireAuthAlert from "../components/RequireAuthAlert";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

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

  // モーダル表示用の state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDeleteConfirm = async () => {
    if (!id || !token) return;

    try {
      await TodoDataService.deleteTodo(id, token);
      setShowDeleteModal(false);
      navigate("/todos");
    } catch (err) {
      console.error(err);
      setError("削除に失敗しました。");
    }
  };

  if (!token) return <RequireAuthAlert />;
  if (!todo) return <div>読み込み中...</div>;

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <Card.Title>Todo詳細</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>タイトル</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>メモ</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="me-2" onClick={handleUpdate}>
              更新
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              削除
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* ConfirmDeleteModal */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export default TodoDetail;
