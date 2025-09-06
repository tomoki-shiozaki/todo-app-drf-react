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
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      TodoDataService.deleteTodo(id, token)
        .then(() => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        })
        .catch((e) => {
          console.error(e);
          alert("Failed to delete todo.");
        });
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
            </div>
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
