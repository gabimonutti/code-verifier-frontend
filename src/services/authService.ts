import { string } from "yup";
import axios from "../utils/config/axios.config";


/**
 * Login Method
 * @param { string } email Email of user
 * @param { string } password Password of user
 * @returns 
 */
export const login = (email:string, password:string) => {
    // Declare body to POST
    let body = {
        email : email,
        password: password
    }

    // Send POST request to login endpoint
    return axios.post("/auth/login", body);
}

/**
 * Register Method
 * @param { string } name Name of user
 * @param { string } email Email of user
 * @param { string } password Password of user
 * @param { number } age Age of user
 * 
 * @returns 
 */
export const register = (name:string, email:string, password:string, age:number) => {
    // Declare body to POST
    let body = {
        name: name,
        email : email,
        password: password,
        age: age
    }

    // Send POST request to login endpoint
    return axios.post("/auth/register", body);
}