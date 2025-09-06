import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TodoDataService from "../services/todos";
import { useAuthContext } from "../context/AuthContext"; // 追加！

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuthContext(); // ここで context から token を取得！

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      await TodoDataService.deleteTodo(id, token);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete todo.");
    }
  };

  const handleComplete = async (id) => {
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

  if (!token) {
    return <p>Please log in to see your todos.</p>;
  }

  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (todos.length === 0) {
    return <p>No todos found.</p>;
  }

  return (
    <Container>
      {/* 新規追加ボタン */}
      <div className="mb-3">
        <Link to="/todos/create">
          <Button variant="primary">新しいTodoを追加</Button>
        </Link>
      </div>

      {todos.map((todo) => (
        <Card key={todo.id} className="mb-3">
          <Card.Body>
            <div>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>
                <b>Memo:</b> {todo.memo}
              </Card.Text>
              <Card.Text>Date created: {todo.created}</Card.Text>
              <Card.Text>
                状態:{" "}
                <span style={{ color: todo.completed ? "green" : "red" }}>
                  {todo.completed ? "完了" : "未完了"}
                </span>
              </Card.Text>
            </div>
            {/* 完了ボタン */}
            <Button
              variant={todo.completed ? "secondary" : "success"}
              className="me-2"
              onClick={() => handleComplete(todo.id)}
            >
              {todo.completed ? "未完了に戻す" : "完了にする"}
            </Button>

            {/* 編集ボタン */}
            <Link
              to={{
                pathname: "/todos/" + todo.id,
                state: { currentTodo: todo },
              }}
            >
              <Button variant="outline-info" className="me-2">
                Edit
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default TodosList;
