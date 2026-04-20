export interface User {
    firstName: string,
    lastName: string,
    email: string
}

export interface BackendResponseError {
    message: string,
    code: string
}