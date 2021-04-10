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

export function uploadPic(pic, callback) {
    let formData = new FormData();
    formData.append('pic', pic);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    }

    this.axios.post(serverUrl + '/pic/upload', formData, config).then(callback);
}
