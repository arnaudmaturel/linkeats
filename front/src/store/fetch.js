import AppSetting from "@/AppSetting"
import axios from 'axios'
class RequestHandler {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(endUrl, params) {
        const accessToken = localStorage.getItem('accessToken')
        return await fetch(this.baseUrl + endUrl + '?' + new URLSearchParams(
            params
        ), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    async post(endUrl, body) {
        const accessToken = localStorage.getItem('accessToken')
        const reqOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        return await fetch(this.baseUrl + endUrl, reqOptions)
    }

    async postImg(endUrl, img) {
        const formData = new FormData();
        formData.append('image', img);
        // formData.append('image', this.imgFile[0]);
        await axios.post(AppSetting.baseUrl + endUrl, formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
        // await axios.post(AppSetting.baseUrl + '/restaurants/upload', formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
    }

    put(endUrl, params, body) {
        const accessToken = localStorage.getItem('accessToken')
        return fetch(this.baseUrl + endUrl + '?' + new URLSearchParams(
            params
        ), {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    delete(endUrl, params) {
        const accessToken = localStorage.getItem('accessToken')
        return fetch(this.baseUrl + endUrl + '?' + new URLSearchParams(
            params
        ), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }
}

// const reqHand = new RequestHandler('http://localhost:80')
const reqHand = new RequestHandler(AppSetting.baseUrl);

export default reqHand