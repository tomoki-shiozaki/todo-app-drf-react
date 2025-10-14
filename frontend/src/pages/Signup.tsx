import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

type SignupFormData = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

function Signup() {
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(formData);

    // 成功してトークンが保存されていれば、ログイン済とみなして遷移
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todos");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">アカウント作成</h2>
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
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          登録
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
