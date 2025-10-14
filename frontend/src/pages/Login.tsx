import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  // Contextからlogin関数を取得
  const { token, login } = useAuthContext();

  // すでにログイン済みなら自動で /todos にリダイレクト
  useEffect(() => {
    if (token) {
      navigate("/todos");
    }
  }, [token, navigate]);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/todos"); // ログイン成功後
    } catch (err) {
      console.error(err);
      setError(
        "ログインに失敗しました。ユーザー名とパスワードを確認してください。"
      );
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">ログイン</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ユーザー名</Form.Label>
          <Form.Control
            type="text"
            placeholder="ユーザー名を入力"
            value={username}
            onChange={onChangeUsername}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            type="password"
            placeholder="パスワードを入力"
            value={password}
            onChange={onChangePassword}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          ログイン
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
