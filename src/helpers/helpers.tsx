import api from '../api';
import AppConfig from '../constants/AppConfig';

export const objectToFormData = (obj: any) => {
    let formData = new FormData();
    if (obj instanceof FormData) {
        formData = obj;
    } else {
        Object.keys(obj).forEach(key => formData.append(key, obj[key]));
    }
    return formData;
};

/**
 * Convert an object to camelCase
 * @param obj
 */
 export function toCamelCase(obj: any) {
    // function to execute on each key
    const callback = (key:any) => key.replace(/(_\w)/g, (k: any) => k[1].toUpperCase());

    // call a generic method
    return deepMapObject(obj, callback);
}

/**
 * Convert an object to snake case
 * @param obj
 */
export function toSnakeCase(obj: any) {
    // function to execute on each key
    const callback = (key: string) => key.replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word: string) => word.toLowerCase())
        .join('_');

    // call a generic method
    return deepMapObject(obj, callback);
}

/**
 * Deep mapping an object
 * @param obj
 * @param callback function to apply to the key
 */
 export function deepMapObject(obj: any, callback: (key: string) => {}) {
    let rtn = obj;
    if (typeof (obj) === 'object') {
        if (obj instanceof Array) {
            rtn = obj.map(item => deepMapObject(item, callback));
        } else {
            rtn = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // apply the change on the string
                    const newKey:any = callback(key);

                    // Falsy or primitive value
                    if (!obj[key] || typeof obj[key] !== 'object')
                        rtn[newKey] = obj[key];
                    // nested object
                    else rtn[newKey] = deepMapObject(obj[key], callback);
                }
            }
        }
    }
    return rtn;
}

/**
 * Get backend credentials
 * @returns {{headers: {Authorization: string, "Content-type": string, Accept: string}, shouldSkipToken: boolean, withCredentials: boolean}}
 */
 export const getFullAuthorisationRequestConfig = () => {
    const headers = {
        'Content-type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa(AppConfig.oauth.clientId + ":" + AppConfig.oauth.clientSecret)
    };
    return { headers, shouldSkipToken: true, withCredentials: true, skipError: true };
};

/**
 * Check if the user's value into store is valid
 *
 * @param authUser
 * @param tokens
 */
 export const isUserIntoStoreValid = (
    authUser: any,
) => {
    return ((authUser !== null &&
        authUser !== undefined)
    );
};

/**
 * Perform normal request
 * @param verb
 * @param url
 * @param data
 * @param config
 * @returns {Promise<any>}
 */
 export const makeRequest = (verb: string, url: string, data: any = null, config = {}) => {
    return new Promise((resolve, reject) => {
        let _url = url;
        if ((verb === 'get' || verb === 'delete') && data) {
            Object.entries(data).map((item: any) => {
                const encoded = encodeURIComponent(item[1]);
                const character = _url.includes('?') ? '&' : '?';
                _url = `${_url}${character}${toSnakeCase(item[0])}=${encoded}`;
                return _url;
            });
        }
        const params = (verb === 'get' || verb === 'delete') ? [_url, config] : [_url, data, config];
        // @ts-ignore
        api[verb](...params)
            .then((result: any) => resolve(result.data))
            .catch((error: any) => reject(error));
    });
};

/**
 * Profile full url of file
 * @param file
 * @returns String
 */
export function getFilePath(file: string) {
    if (file)
        if (file.startsWith('http') && file.includes(':')) {
            return file;
        } else {
            return `${AppConfig.api.baseUrl}${file}`
        }
}