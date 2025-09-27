import { APIResponse, request } from "@playwright/test";
import { config } from "../config/APIConfig";
import { APIConfiguration, APIHeaders, RequestOptions } from "../types/api.types";
import { AuthManager } from "../auth/AuthManager";

class APIUtils {
    private configuration: APIConfiguration;
    private defaultHeaders: APIHeaders;
    private authManager: AuthManager;

    /**
     * Initialize API Utils
     * @param customConfig - Custom configuration to override defaults
     * @param authManager - Authentication manager instance
     */
    constructor(customConfig: APIConfiguration = {}, authManager?: AuthManager) {
        this.configuration = {
            ...config.apiConfig,
            ...customConfig
        };

        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        this.authManager = authManager || new AuthManager();
    }

    /**
     * Core method to make HTTP requests (DRY principle)
     * @param options - Request options containing method, endpoint, data, headers
     * @returns Promise<APIResponse>
     */
    async makeRequest(options: RequestOptions): Promise<APIResponse> {
        const { method, endpoint, data, headers = {}, requiresAuth = true } = options;

        const requestHeaders: APIHeaders = {
            ...this.defaultHeaders,
            ...headers
        };

        if (requiresAuth) {
            try {
                const authHeader = this.authManager.getAuthHeader();
                Object.assign(requestHeaders, authHeader);
            } catch (error) {
                throw new Error(`Authentication required but no valid token available: ${error.message}`);
            }
        }

        try {
            const context = await request.newContext({
                baseURL: this.configuration.baseURL,
                extraHTTPHeaders: requestHeaders
            });

            let response: APIResponse;

            switch (method) {
                case 'GET':
                    response = await context.get(endpoint);
                    break;
                case 'POST':
                    response = await context.post(endpoint, { data });
                    break;
                case 'PATCH':
                    response = await context.put(endpoint, { data });
                    break;
                case 'PUT':
                    response = await context.put(endpoint, { data });
                    break;
                case 'DELETE':
                    response = await context.delete(endpoint);
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }

            await context.dispose();
            return response;

        } catch (error) {
            throw new Error(`${method} request failed for ${endpoint}: ${error.message}`);
        }
    }

    /**
     * GET request wrapper
     * @param endpoint - API endpoint
     * @param headers - Additional headers
     * @param requiresAuth - Whether authentication is required
     * @returns Promise<APIResponse>
     */
    async get(endpoint: string, headers: APIHeaders = {}, requiresAuth: boolean = true): Promise<APIResponse> {
        return this.makeRequest({
            method: 'GET',
            endpoint,
            headers,
            requiresAuth
        });
    }

    /**
     * Validate response status
     * @param response - API response
     * @param expectedStatus - Expected status code
     * @returns boolean
     */
    validateResponseStatus(response: APIResponse, expectedStatus: number = 200): boolean {
        return response.status() === expectedStatus;
    }

    /**
     * Get validated response data
     * @param response - API response
     * @param expectedStatus - Expected status code
     * @returns Promise<any>
     */
    async getValidatedResponseData(response: APIResponse, expectedStatus: number = 200): Promise<any> {
        if (!this.validateResponseStatus(response, expectedStatus)) {
            throw new Error(`API response failed. Expected: ${expectedStatus}, Actual: ${response.status()}`);
        }

        try {
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to parse response JSON: ${error.message}`);
        }
    }

    /**
     * Set authentication manager
     * @param authManager - Authentication manager instance
     */
    setAuthManager(authManager: AuthManager): void {
        this.authManager = authManager;
    }
}

export { APIUtils };