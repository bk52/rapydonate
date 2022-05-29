import axios from "axios";

export const API_URLS = {
    BASEURL: "http://localhost:9600/api",
    COUNTRIES: '/countries',
    URLS: '/urls',
    PAYMENT_METHODS: '/paymentmethods',
    CHECKOUT: '/checkout',
    DONATE: '/donations'
};

export const api = axios.create({
    baseURL: API_URLS.BASEURL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "apikey": "ZM86vZa8Vl",
    },
});