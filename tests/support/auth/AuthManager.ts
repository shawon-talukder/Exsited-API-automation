import { IAuth } from "../types/auth.types";

class AuthManager {
    accessToken: string | null;
    refreshToken: string | null;
    tokenType: string;
    expiresIn: number | null;
    expiryTime: Date;

    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenType = 'Bearer';
        this.expiresIn = null;
    }


    /**
      * Set authentication tokens
      * @param {Object} tokenData - Token data from authentication response
      */
    setTokens(tokenData: IAuth) {
        this.accessToken = tokenData.accessToken;
        this.refreshToken = tokenData.refreshToken;
        this.tokenType = tokenData.tokenType || 'Bearer';
        this.expiresIn = tokenData.expiresIn;

        // Set expiry time if expires_in is provided
        if (this.expiresIn) {
            this.expiryTime = new Date(Date.now() + this.expiresIn * 1000)
        }
    }

    /**
      * Get authorization header
      * @returns {Object} Headers with authorization
      */
    getAuthHeader() {
        if (!this.accessToken) {
            throw new Error('No authentication token available')
        }
        return {
            'Authorization': `${this.tokenType} ${this.accessToken}`
        }
    }

    /**
     * Check if token is expired
     * @returns {boolean}
     */
    isTokenExpired() {
        if (!this.expiresIn) return false
        // Add buffer of 60 seconds
        return Date.now() >= (this.expiryTime.getTime() - 60000)
    }
}


module.exports = { AuthManager }