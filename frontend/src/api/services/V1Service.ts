/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Login } from '../models/Login';
import type { PasswordChange } from '../models/PasswordChange';
import type { PasswordReset } from '../models/PasswordReset';
import type { PasswordResetConfirm } from '../models/PasswordResetConfirm';
import type { PatchedTodo } from '../models/PatchedTodo';
import type { PatchedTodoToggleComplete } from '../models/PatchedTodoToggleComplete';
import type { PatchedUserDetails } from '../models/PatchedUserDetails';
import type { Register } from '../models/Register';
import type { ResendEmailVerification } from '../models/ResendEmailVerification';
import type { RestAuthDetail } from '../models/RestAuthDetail';
import type { Todo } from '../models/Todo';
import type { TodoToggleComplete } from '../models/TodoToggleComplete';
import type { Token } from '../models/Token';
import type { UserDetails } from '../models/UserDetails';
import type { VerifyEmail } from '../models/VerifyEmail';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class V1Service {
    /**
     * Check the credentials and return the REST Token
     * if the credentials are valid and authenticated.
     * Calls Django Auth login method to register User ID
     * in Django session framework
     *
     * Accept the following POST parameters: username, password
     * Return the REST Framework Token Object's key.
     * @param requestBody
     * @returns Token
     * @throws ApiError
     */
    public static v1DjRestAuthLoginCreate(
        requestBody: Login,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/login/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Calls Django logout method and delete the Token object
     * assigned to the current User object.
     *
     * Accepts/Returns nothing.
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static v1DjRestAuthLogoutCreate(): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/logout/',
        });
    }
    /**
     * Calls Django Auth SetPasswordForm save method.
     *
     * Accepts the following POST parameters: new_password1, new_password2
     * Returns the success/fail message.
     * @param requestBody
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static v1DjRestAuthPasswordChangeCreate(
        requestBody: PasswordChange,
    ): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/password/change/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Calls Django Auth PasswordResetForm save method.
     *
     * Accepts the following POST parameters: email
     * Returns the success/fail message.
     * @param requestBody
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static v1DjRestAuthPasswordResetCreate(
        requestBody: PasswordReset,
    ): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/password/reset/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Password reset e-mail link is confirmed, therefore
     * this resets the user's password.
     *
     * Accepts the following POST parameters: token, uid,
     * new_password1, new_password2
     * Returns the success/fail message.
     * @param requestBody
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static v1DjRestAuthPasswordResetConfirmCreate(
        requestBody: PasswordResetConfirm,
    ): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/password/reset/confirm/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Registers a new user.
     *
     * Accepts the following POST parameters: username, email, password1, password2.
     * @param requestBody
     * @returns Token
     * @throws ApiError
     */
    public static v1DjRestAuthRegistrationCreate(
        requestBody: Register,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/registration/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Resends another email to an unverified email.
     *
     * Accepts the following POST parameter: email.
     * @param requestBody
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static v1DjRestAuthRegistrationResendEmailCreate(
        requestBody?: ResendEmailVerification,
    ): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/registration/resend-email/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Verifies the email associated with the provided key.
     *
     * Accepts the following POST parameter: key.
     * @param requestBody
     * @returns RestAuthDetail
     * @throws ApiError
     */
    public static v1DjRestAuthRegistrationVerifyEmailCreate(
        requestBody: VerifyEmail,
    ): CancelablePromise<RestAuthDetail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/dj-rest-auth/registration/verify-email/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     * @returns UserDetails
     * @throws ApiError
     */
    public static v1DjRestAuthUserRetrieve(): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/dj-rest-auth/user/',
        });
    }
    /**
     * Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     * @param requestBody
     * @returns UserDetails
     * @throws ApiError
     */
    public static v1DjRestAuthUserUpdate(
        requestBody: UserDetails,
    ): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/dj-rest-auth/user/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     *
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     *
     * Returns UserModel fields.
     * @param requestBody
     * @returns UserDetails
     * @throws ApiError
     */
    public static v1DjRestAuthUserPartialUpdate(
        requestBody?: PatchedUserDetails,
    ): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/dj-rest-auth/user/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Todo
     * @throws ApiError
     */
    public static v1TodosList(): CancelablePromise<Array<Todo>> {
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
    public static v1TodosCreate(
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
    public static v1TodosRetrieve(
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
    public static v1TodosUpdate(
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
    public static v1TodosPartialUpdate(
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
    public static v1TodosDestroy(
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
    public static v1TodosCompleteUpdate(
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
    public static v1TodosCompletePartialUpdate(
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
