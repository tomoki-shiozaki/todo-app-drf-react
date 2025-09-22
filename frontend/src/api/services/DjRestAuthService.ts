/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Login } from '../models/Login';
import type { PasswordChange } from '../models/PasswordChange';
import type { PasswordReset } from '../models/PasswordReset';
import type { PasswordResetConfirm } from '../models/PasswordResetConfirm';
import type { PatchedUserDetails } from '../models/PatchedUserDetails';
import type { Register } from '../models/Register';
import type { ResendEmailVerification } from '../models/ResendEmailVerification';
import type { RestAuthDetail } from '../models/RestAuthDetail';
import type { Token } from '../models/Token';
import type { UserDetails } from '../models/UserDetails';
import type { VerifyEmail } from '../models/VerifyEmail';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DjRestAuthService {
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
    public static djRestAuthLoginCreate(
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
    public static djRestAuthLogoutCreate(): CancelablePromise<RestAuthDetail> {
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
    public static djRestAuthPasswordChangeCreate(
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
    public static djRestAuthPasswordResetCreate(
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
    public static djRestAuthPasswordResetConfirmCreate(
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
    public static djRestAuthRegistrationCreate(
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
    public static djRestAuthRegistrationResendEmailCreate(
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
    public static djRestAuthRegistrationVerifyEmailCreate(
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
    public static djRestAuthUserRetrieve(): CancelablePromise<UserDetails> {
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
    public static djRestAuthUserUpdate(
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
    public static djRestAuthUserPartialUpdate(
        requestBody?: PatchedUserDetails,
    ): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/dj-rest-auth/user/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
