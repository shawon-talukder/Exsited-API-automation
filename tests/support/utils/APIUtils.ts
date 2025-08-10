import { config } from "../config/APIConfig";

class APIUtils {
    configuration = {};
    defaultHeaders = {};
    /**
     * Initialize testCaseAPI Utils
     * @param {string} baseURL - Base URL of the testCaseAPI
     * @param {Object} defaultHeaders - Default headers to be sent with each request
     */
    constructor(customConfig = {}) {
        this.configuration = {
            ...config.apiConfig,
            ...customConfig
        }

        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}


module.exports = { APIUtils }