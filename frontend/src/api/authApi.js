import axios from "axios";

const checkUserTokenAPI = (token) => {
    return axios.get("/api/auth/checkUserToken", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const checkAdminTokenAPI = (token) => {
    return axios.get("/api/auth/checkAdminToken", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const googleLoginAPI = (code) => {
    return axios.post('/api/auth/google', {  
        code,
    })
}

const loginAPI = (email, password) => {
    return axios.post('/api/auth/login', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
}

const signupAPI = (firstname, lastname, email, password, phone) => {
    return axios.post('/api/auth/register', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        phone: phone,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
}

export { checkUserTokenAPI, checkAdminTokenAPI, googleLoginAPI, loginAPI, signupAPI }