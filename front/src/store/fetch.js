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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        return await fetch(this.baseUrl + endUrl, reqOptions)
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

const reqHand = new RequestHandler('http://localhost:80')

export default reqHand