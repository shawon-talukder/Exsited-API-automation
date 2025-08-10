class APIEndpoints {
    // authentication endpoints
    static get AUTH() {
        return "/oauth2/token"
    }

    /**
     * Object: Accounts
     */
    static get ACCOUNTS() {
        return {
            BASE: "/accounts",
            BY_ID: (account_id: string) => `/accounts/${account_id}`,
            BY_CONTACTS: (account_id: string) => this.ACCOUNTS.BY_ID(account_id) + '/contacts',
            BY_SINGLE_CONTACT: (account_id: string, contact_type: string) => this.ACCOUNTS.BY_CONTACTS(account_id) + `/${contact_type}`,
            BY_ADDRESSES: (account_id: string) => this.ACCOUNTS.BY_ID(account_id) + '/addresses',
            BY_SINGLE_ADDRESS: (account_id: string, address_uuid: string) => this.ACCOUNTS.BY_ADDRESSES(account_id) + `/${address_uuid}`,
        }
    }

    /**
     * Object: Orders
     */
    static get ORDERS() {
        return {
            BASE: "/orders",
            BY_ID: (order_id: string) => `/orders/${order_id}`
        }
    }
}

const APIConfig = {
    baseURL: process.env.API_BASE_URL,
    timeout: process.env.API_TIMEOUT,
    version: process.env.API_VERSION,
    endpoints: APIEndpoints
}

module.exports = { apiConfig: APIConfig, APIEndpoints }