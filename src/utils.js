import {serverUrl} from "@/config";

export function api(apiName, data, callback) {
    this.axios(serverUrl + apiName, {
        method: "post",
        data,
    }).then(callback);
}
