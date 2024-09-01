export class AppConstants {

    static readonly API_URL = "http://localhost:8080/api";
    static readonly PUBLIC_URLS = [`${this.API_URL}/login`, `${this.API_URL}/register`];
    static readonly PUBLIC_GET_URLS = [`${this.API_URL}/brands`, `${this.API_URL}/categories`, `${this.API_URL}/cars/limited`, `${this.API_URL}/cars`, `${this.API_URL}/cars/byId`];


}