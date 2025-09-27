export interface APIConfiguration {
    baseURL?: string;
    timeout?: string | number;
    version?: string;
}

export interface APIHeaders {
    [key: string]: string;
}

export interface RequestOptions {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    endpoint: string;
    data?: any;
    headers?: APIHeaders;
    requiresAuth?: boolean;
}

export interface APIResponse {
    status: number;
    data: any;
    headers: any;
}

export interface Account {
    id: string;
    name?: string;
    email?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Contact {
    id: string;
    type: string;
    value: string;
    accountId: string;
}

export interface Address {
    uuid: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    accountId: string;
}