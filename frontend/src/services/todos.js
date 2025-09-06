import axios from "axios";

// Axios インスタンスの作成
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1",
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
    try {
      const response = await api.get("/todos/", {
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createTodo(data, token) {
    try {
      const response = await api.post("/todos/", data, {
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTodoById(id, token) {
    const response = await api.get(`/todos/${id}/`, {
      headers: { Authorization: token ? `Token ${token}` : "" },
    });
    return response.data;
  }

  async updateTodo(id, data, token) {
    const response = await api.put(`/todos/${id}/`, data, {
      headers: { Authorization: token ? `Token ${token}` : "" },
    });
    return response.data;
  }

  async deleteTodo(id, token) {
    const response = await api.delete(`/todos/${id}/`, {
      headers: { Authorization: token ? `Token ${token}` : "" },
    });
    return response.data;
  }

  async completeTodo(id, token) {
    try {
      const response = await api.put(`/todos/${id}/complete`, null, {
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error completing todo:", error);
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await api.post("/dj-rest-auth/login/", data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async logout() {
    return await api.post(
      "/dj-rest-auth/logout/",
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  async signup(data) {
    try {
      const response = await api.post("/dj-rest-auth/registration/", data);
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
}

export default new TodoDataService();
