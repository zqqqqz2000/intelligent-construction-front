import {serverUrl} from "@/config";

export function api(apiName, data, callback, withToken = false) {
    if (withToken) {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/login');
        }
        data.token = token;
    }
    this.axios(serverUrl + apiName, {
        method: "post",
        data,
    }).then(callback);
}
