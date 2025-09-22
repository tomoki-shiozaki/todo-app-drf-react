/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedTodo } from '../models/PatchedTodo';
import type { PatchedTodoToggleComplete } from '../models/PatchedTodoToggleComplete';
import type { Todo } from '../models/Todo';
import type { TodoToggleComplete } from '../models/TodoToggleComplete';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TodosService {
    /**
     * @returns Todo
     * @throws ApiError
     */
    public static todosList(): CancelablePromise<Array<Todo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/todos/',
        });
    }
    /**
     * @param requestBody
     * @returns Todo
     * @throws ApiError
     */
    public static todosCreate(
        requestBody: Todo,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/todos/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns Todo
     * @throws ApiError
     */
    public static todosRetrieve(
        id: number,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/todos/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Todo
     * @throws ApiError
     */
    public static todosUpdate(
        id: number,
        requestBody: Todo,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/todos/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Todo
     * @throws ApiError
     */
    public static todosPartialUpdate(
        id: number,
        requestBody?: PatchedTodo,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/todos/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static todosDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/todos/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns TodoToggleComplete
     * @throws ApiError
     */
    public static todosCompleteUpdate(
        id: number,
        requestBody?: TodoToggleComplete,
    ): CancelablePromise<TodoToggleComplete> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/todos/{id}/complete/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns TodoToggleComplete
     * @throws ApiError
     */
    public static todosCompletePartialUpdate(
        id: number,
        requestBody?: PatchedTodoToggleComplete,
    ): CancelablePromise<TodoToggleComplete> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/todos/{id}/complete/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
