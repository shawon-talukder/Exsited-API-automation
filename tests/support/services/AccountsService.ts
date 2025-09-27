import { APIResponse } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
import { config } from "../config/APIConfig";
import { Account, Contact, Address } from "../types/api.types";

class AccountsService {
    private apiUtils: APIUtils;

    /**
     * Initialize Accounts Service
     * @param apiUtils - API utilities instance
     */
    constructor(apiUtils: APIUtils) {
        this.apiUtils = apiUtils;
    }

    /**
     * Get all accounts
     * @returns Promise<Account[]>
     */
    async getAllAccounts(): Promise<Account[]> {
        const response = await this.apiUtils.get(config.APIEndpoints.ACCOUNTS.BASE);
        return await this.apiUtils.getValidatedResponseData(response);
    }

    /**
     * Get account by ID
     * @param accountId - Account ID
     * @returns Promise<Account>
     */
    async getAccountById(accountId: string): Promise<Account> {
        const response = await this.apiUtils.get(config.APIEndpoints.ACCOUNTS.BY_ID(accountId));
        return await this.apiUtils.getValidatedResponseData(response);
    }

    /**
     * Get all contacts for an account
     * @param accountId - Account ID
     * @returns Promise<Contact[]>
     */
    async getAccountContacts(accountId: string): Promise<Contact[]> {
        const response = await this.apiUtils.get(config.APIEndpoints.ACCOUNTS.BY_CONTACTS(accountId));
        return await this.apiUtils.getValidatedResponseData(response);
    }

    /**
     * Get specific contact type for an account
     * @param accountId - Account ID
     * @param contactType - Contact type (email, phone, etc.)
     * @returns Promise<Contact>
     */
    async getAccountContactByType(accountId: string, contactType: string): Promise<Contact> {
        const response = await this.apiUtils.get(config.APIEndpoints.ACCOUNTS.BY_SINGLE_CONTACT(accountId, contactType));
        return await this.apiUtils.getValidatedResponseData(response);
    }

    /**
     * Get all addresses for an account
     * @param accountId - Account ID
     * @returns Promise<Address[]>
     */
    async getAccountAddresses(accountId: string): Promise<Address[]> {
        const response = await this.apiUtils.get(config.APIEndpoints.ACCOUNTS.BY_ADDRESSES(accountId));
        return await this.apiUtils.getValidatedResponseData(response);
    }

    /**
     * Get specific address for an account
     * @param accountId - Account ID
     * @param addressUuid - Address UUID
     * @returns Promise<Address>
     */
    async getAccountAddressByUuid(accountId: string, addressUuid: string): Promise<Address> {
        const response = await this.apiUtils.get(config.APIEndpoints.ACCOUNTS.BY_SINGLE_ADDRESS(accountId, addressUuid));
        return await this.apiUtils.getValidatedResponseData(response);
    }
}

// Export singleton instance (following reference repository pattern)
export const accountsService = new AccountsService(new APIUtils());
export { AccountsService };