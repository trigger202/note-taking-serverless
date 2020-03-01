import axios from "axios";

class ApiClient {

    constructor(config) {
        this.client = axios.create(config);
    }
    get(url, headers = []) {
        return this.client.get(url, headers);
    }
    post(url, data, headers = []) {
    }

    put(url, data, headers = []) {

    }

    patch(url, data, headers = []) {

    }
    delete(url, data, headers = []) {

    }

    getInstance(config) {
        return axios.create(config);
    }

}


export default new ApiClient();