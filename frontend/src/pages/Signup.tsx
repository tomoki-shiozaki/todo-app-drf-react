import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

type SignupFormData = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

function Signup() {
  const { signup, token } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // すでにログイン済みなら /todos にリダイレクト
  useEffect(() => {
    if (token) {
      navigate("/todos");
    }
  }, [token, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signup(formData);

      // 成功してトークンが保存されていれば、ログイン済とみなして遷移
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/todos");
      }
    } catch (err) {
      console.error(err);
      setError("登録に失敗しました。入力内容を確認してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">アカウント作成</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ユーザー名</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="ユーザー名を入力"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="メールアドレスを入力"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            placeholder="パスワードを入力"
            value={formData.password1}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>パスワード（確認用）</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="確認用パスワードを入力"
            value={formData.password2}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              登録中...
            </>
          ) : (
            "登録"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
