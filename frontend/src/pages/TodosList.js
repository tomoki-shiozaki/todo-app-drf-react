import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TodoDataService from "../services/todos";

const TodosList = (props) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.token) return;

    const retrieveTodos = () => {
      setLoading(true);
      TodoDataService.getAll(props.token)
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
  }, [props.token]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      TodoDataService.deleteTodo(id, props.token)
        .then(() => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        })
        .catch((e) => {
          console.error(e);
          alert("Failed to delete todo.");
        });
    }
  };

  if (!props.token) {
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
