import axios, { AxiosResponse } from "axios";
import { Department } from "../../models/Department";
import { Procedure } from "../../models/Procedure";

axios.defaults.baseURL = 'https://localhost:7058/api/'

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Category = {
    list: () => requests.get("categories"),
    details: (id: number) => requests.get(`categories/${id}`),
};

const Departments = {
    list: () => requests.get("departments"),
    addDepartment: (newItem: Department) => requests.post(`departments`, newItem),
    update: (updatedItem: Department) => requests.put(`departments`, updatedItem),
    remove: (id: number) => requests.delete(`departments/${id}`)
}

const Procedures = {
    list: () => requests.get("procedures"),
    details: (id: number) => requests.get(`procedures/${id}`),
    addProcedure: (newProcedure: Procedure) => requests.post(`procedures`, newProcedure),
    updateProcedure: (updatedProcedure: Procedure) => requests.put(`procedures`, updatedProcedure),
    removeProcedure: (id: number) => requests.delete(`procedures/${id}`)
}

const agent = {
    Category,
    Departments,
    Procedures
};

export default agent;