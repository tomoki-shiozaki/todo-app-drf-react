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
export class V2Service {
    /**
     * @returns Todo
     * @throws ApiError
     */
    public static v2TodosList(): CancelablePromise<Array<Todo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/todos/',
        });
    }
    /**
     * @param requestBody
     * @returns Todo
     * @throws ApiError
     */
    public static v2TodosCreate(
        requestBody: Todo,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v2/todos/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns Todo
     * @throws ApiError
     */
    public static v2TodosRetrieve(
        id: number,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v2/todos/{id}/',
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
    public static v2TodosUpdate(
        id: number,
        requestBody: Todo,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/todos/{id}/',
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
    public static v2TodosPartialUpdate(
        id: number,
        requestBody?: PatchedTodo,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v2/todos/{id}/',
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
    public static v2TodosDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v2/todos/{id}/',
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
    public static v2TodosCompleteUpdate(
        id: number,
        requestBody?: TodoToggleComplete,
    ): CancelablePromise<TodoToggleComplete> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v2/todos/{id}/complete/',
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
    public static v2TodosCompletePartialUpdate(
        id: number,
        requestBody?: PatchedTodoToggleComplete,
    ): CancelablePromise<TodoToggleComplete> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v2/todos/{id}/complete/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
