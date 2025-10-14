import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div className="signup-container">
      <h2>アカウント作成</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名：</label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>メールアドレス：</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>パスワード：</label>
          <br />
          <input
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>パスワード（確認用）：</label>
          <br />
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default Signup;
