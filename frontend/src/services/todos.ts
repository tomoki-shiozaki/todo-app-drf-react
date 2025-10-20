import apiClient from "./apiClient";
import type { paths } from "../types/api"; // openapi-typescript で生成された型ファイル

// --- 型定義 ---
type TodosListResponse =
  paths["/api/v1/todos/"]["get"]["responses"]["200"]["content"]["application/json"];

type CreateTodoRequest =
  paths["/api/v1/todos/"]["post"]["requestBody"]["content"]["application/json"];
type CreateTodoRequestData = Pick<CreateTodoRequest, "title" | "memo">;
type CreateTodoResponse =
  paths["/api/v1/todos/"]["post"]["responses"]["201"]["content"]["application/json"];

type GetTodoResponse =
  paths["/api/v1/todos/{id}/"]["get"]["responses"]["200"]["content"]["application/json"];

type UpdateTodoRequest =
  paths["/api/v1/todos/{id}/"]["put"]["requestBody"]["content"]["application/json"];
type UpdateTodoRequestData = Pick<UpdateTodoRequest, "title" | "memo">;
type UpdateTodoResponse =
  paths["/api/v1/todos/{id}/"]["put"]["responses"]["200"]["content"]["application/json"];

type CompleteTodoResponse =
  paths["/api/v1/todos/{id}/complete/"]["put"]["responses"]["200"]["content"];

// --- クラス定義 ---
class TodoDataService {
  // 全件取得
  async getAll(token: string): Promise<TodosListResponse> {
    const response = await apiClient.get<TodosListResponse>("/todos/", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  }

  // 新規作成
  async createTodo(
    data: CreateTodoRequestData,
    token: string
  ): Promise<CreateTodoResponse> {
    const response = await apiClient.post<CreateTodoResponse>("/todos/", data, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  }

  // ID指定で取得
  async getTodoById(id: string, token: string): Promise<GetTodoResponse> {
    const response = await apiClient.get<GetTodoResponse>(`/todos/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  }

  // 更新
  async updateTodo(
    id: string,
    data: UpdateTodoRequestData,
    token: string
  ): Promise<UpdateTodoResponse> {
    const response = await apiClient.put<UpdateTodoResponse>(
      `/todos/${id}/`,
      data,
      { headers: { Authorization: `Token ${token}` } }
    );
    return response.data;
  }

  // 削除
  async deleteTodo(id: string | number, token: string): Promise<void> {
    await apiClient.delete(`/todos/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
  }

  // 完了処理
  async completeTodo(
    id: string | number,
    token: string
  ): Promise<CompleteTodoResponse> {
    const response = await apiClient.put<CompleteTodoResponse>(
      `/todos/${id}/complete/`,
      null,
      { headers: { Authorization: `Token ${token}` } }
    );
    return response.data;
  }
}

export default new TodoDataService();
