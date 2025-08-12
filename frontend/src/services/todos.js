import axios from "axios";

// Axios インスタンスの作成
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

class TodoDataService {
  async getAll(token) {
    setAuthHeader(token);
    try {
      const response = await api.get("/todos/");
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  async createTodo(data, token) {
    setAuthHeader(token);
    try {
      const response = await api.post("/todos/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  async updateTodo(id, data, token) {
    setAuthHeader(token);
    try {
      const response = await api.put(`/todos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }

  async deleteTodo(id, token) {
    setAuthHeader(token);
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }

  async completeTodo(id, token) {
    setAuthHeader(token);
    try {
      const response = await api.put(`/todos/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error("Error completing todo:", error);
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await api.post("/login/", data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async signup(data) {
    try {
      const response = await api.post("/signup/", data);
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
}

export default new TodoDataService();
