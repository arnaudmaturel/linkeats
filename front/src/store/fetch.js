class RequestHandler {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    get(endUrl, params) {
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl, {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: params
        });
    }

    post(endUrl, params, body) { 
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: params,
            body: JSON.stringify(body)
        });
    }

    put(endUrl, params, body) {
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl, {
            method: 'PUT',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: params,
            body: JSON.stringify(body)
        });
    }

    delete(endUrl, params) {
        // const accessToken = JSON.parse(localStorage.getItem('accesstoken'))
        return fetch(this.baseUrl + endUrl, {
            method: 'DELETE',
            headers: {
                // 'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: params
        });
    }
}

const reqHand = new RequestHandler('http://localhost:80')

export default reqHand