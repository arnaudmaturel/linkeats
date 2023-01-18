class RequestHandler {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(endUrl, params) {
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl + '?' + new URLSearchParams(
            params
        ), {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    post(endUrl, params, body) { 
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl + '?' + new URLSearchParams(
            params
        ), {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    put(endUrl, params, body) {
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl + '?' + new URLSearchParams(
            params
        ), {
            method: 'PUT',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    delete(endUrl, params) {
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl + '?' + new URLSearchParams(
            params
        ), {
            method: 'DELETE',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }
}

const reqHand = new RequestHandler('http://localhost:80')

export default reqHand