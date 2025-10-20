import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoDataService from "../../services/todos"; // 詳細取得、更新、削除ロジック
import { useAuthContext } from "../../context/AuthContext";
import type { components, paths } from "../../types/api";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { RequireAuthAlert } from "../../components/auth";
import { ConfirmDeleteModal } from "../../components/todos";
import { Loading } from "../../components/common";

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
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!id || !token) return;

    async function fetchTodo(todoId: string, authToken: string) {
      setLoading(true);
      setError(null);
      try {
        const data = await TodoDataService.getTodoById(todoId, authToken);
        setTodo(data);
        setTitle(data.title);
        setMemo(data.memo ?? "");
      } catch (err: any) {
        setError(err.message || "Todoの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    }

    fetchTodo(id, token);
  }, [id, token]);

  const handleUpdate = async () => {
    if (!id || !token) return;
    setError(null);

    const data: UpdateTodoRequestData = { title, memo };

    try {
      await TodoDataService.updateTodo(id, data, token);
      navigate("/todos");
    } catch (err: any) {
      setError(err.message || "更新に失敗しました。");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!id || !token) return;
    setDeleting(true);
    setError(null);

    try {
      await TodoDataService.deleteTodo(id, token);
      setShowDeleteModal(false);
      navigate("/todos");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "削除に失敗しました。");
    } finally {
      setDeleting(false);
    }
  };

  if (!token) return <RequireAuthAlert />;
  if (loading) return <Loading message="Todoを読み込み中..." />;
  if (!todo) return <Alert variant="info">Todoが見つかりません。</Alert>;

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
            <Button
              variant="danger"
              className="me-2"
              onClick={() => setShowDeleteModal(true)}
              disabled={deleting}
            >
              {deleting ? "削除中..." : "削除"}
            </Button>
            <Button variant="secondary" onClick={() => navigate("/todos")}>
              Todo一覧へ戻る
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <ConfirmDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export default TodoDetail;
