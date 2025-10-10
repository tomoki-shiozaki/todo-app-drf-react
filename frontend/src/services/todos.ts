import apiClient from "./apiClient";
import type { paths } from "../types/api"; // openapi-typescript で生成された型ファイル

type TodosListResponse =
  paths["/api/v1/todos/"]["get"]["responses"]["200"]["content"]["application/json"];

type CreateTodoRequest =
  paths["/api/v1/todos/"]["post"]["requestBody"]["content"]["application/json"];
type CreateTodoResponse =
  paths["/api/v1/todos/"]["post"]["responses"]["201"]["content"]["application/json"];

type GetTodoResponse =
  paths["/api/v1/todos/{id}/"]["get"]["responses"]["200"]["content"]["application/json"];

type UpdateTodoRequest =
  paths["/api/v1/todos/{id}/"]["put"]["requestBody"]["content"]["application/json"];
type UpdateTodoResponse =
  paths["/api/v1/todos/{id}/"]["put"]["responses"]["200"]["content"]["application/json"];

class TodoDataService {
  async getAll(token: string): Promise<TodosListResponse> {
    try {
      const response = await apiClient.get<TodosListResponse>("/todos/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createTodo(
    data: CreateTodoRequest,
    token: string
  ): Promise<CreateTodoResponse> {
    try {
      const response = await apiClient.post<CreateTodoResponse>(
        "/todos/",
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTodoById(
    id: number | string,
    token: string
  ): Promise<GetTodoResponse> {
    const response = await apiClient.get<GetTodoResponse>(`/todos/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  }

  async updateTodo(
    id: string | number,
    data: UpdateTodoRequest,
    token: string
  ): Promise<UpdateTodoResponse> {
    const response = await apiClient.put<UpdateTodoResponse>(
      `/todos/${id}/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  }

  async deleteTodo(id: string | number, token: string): Promise<void> {
    await apiClient.delete(`/todos/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
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
