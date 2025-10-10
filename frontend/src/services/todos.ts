import apiClient from "./apiClient";
import type { paths } from "../types/api"; // openapi-typescript で生成された型ファイル

type TodosListResponse =
  paths["/api/v1/todos/"]["get"]["responses"]["200"]["content"]["application/json"];

class TodoDataService {
  async getAll(token: string): Promise<TodosListResponse> {
    try {
      const response = await apiClient.get<TodosListResponse>("/todos/", {
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
      const response = await apiClient.post("/todos/", data, {
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
    const response = await apiClient.get(`/todos/${id}/`, {
      headers: { Authorization: token ? `Token ${token}` : "" },
    });
    return response.data;
  }

  async updateTodo(id, data, token) {
    const response = await apiClient.put(`/todos/${id}/`, data, {
      headers: { Authorization: token ? `Token ${token}` : "" },
    });
    return response.data;
  }

  async deleteTodo(id, token) {
    const response = await apiClient.delete(`/todos/${id}/`, {
      headers: { Authorization: token ? `Token ${token}` : "" },
    });
    return response.data;
  }

  async completeTodo(id, token) {
    try {
      const response = await apiClient.put(`/todos/${id}/complete/`, null, {
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
}

export default new TodoDataService();
