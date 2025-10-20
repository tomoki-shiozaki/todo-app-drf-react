import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import TodoDataService from "../../services/todos";
import { useAuthContext } from "../../context/AuthContext";
import { useErrorContext } from "../../context/ErrorContext";
import type { FormEvent } from "react";
import type { paths } from "../../types/api";
import { RequireAuthAlert } from "../../components/auth";

type CreateTodoRequest =
  paths["/api/v1/todos/"]["post"]["requestBody"]["content"]["application/json"];
type CreateTodoRequestData = Pick<CreateTodoRequest, "title" | "memo">;

function AddTodo() {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { setError: setGlobalError } = useErrorContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setLocalError("認証情報がありません。再ログインしてください。");
      return;
    }

    setLocalError(null);
    setLoading(true);

    const data: CreateTodoRequestData = { title, memo };

    try {
      await TodoDataService.createTodo(data, token);
      navigate("/todos");
    } catch (err: any) {
      console.error("Error creating todo:", err);
      // サーバー系エラーはグローバル
      if (
        !err.response ||
        (err.response.status >= 500 && err.response.status < 600)
      ) {
        setGlobalError(
          err.message || "サーバーエラーによりTodoを作成できませんでした。"
        );
        setLocalError("サーバーエラーによりTodoを作成できませんでした。");
      } else {
        // 500系以外はローカル
        setLocalError(err.message || "Todoの作成に失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <RequireAuthAlert />;

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">新しいTodoを追加</h2>

      {localError && (
        <Alert variant="danger" dismissible onClose={() => setLocalError(null)}>
          {localError}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>タイトル</Form.Label>
          <Form.Control
            type="text"
            placeholder="タイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>メモ</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="メモを入力"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "追加中..." : "追加"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddTodo;
