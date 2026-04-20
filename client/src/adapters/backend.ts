import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const fetchUserData = async () => {
    try {
        const { data } = await axios.get(BASE_URL + "/auth/me", {
            withCredentials: true
        });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const login = async ({ email, password }: { email: string; password: string }) => {
    try {
        await axios.post(BASE_URL + "/auth/login", { email, password }, {
            withCredentials: true
        });
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const register = async ({ email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
        await axios.post(BASE_URL + "/auth/register", { email, password, first_name: firstName, last_name: lastName }, {
            withCredentials: true
        });
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const fetchCourses = async () => {
    try {
        const { data } = await axios.get(BASE_URL + "/courses", {
            withCredentials: true
        });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const createCourses = async (prompt: string) => {
    try {
        const { data } = await axios.post(BASE_URL + "/courses", {
            prompt
        }, {
            withCredentials: true
        });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const fetchCourseContent = async ({ courseId, contentId }: { courseId: string, contentId: string }) => {
    try {
        const { data } = await axios.get(BASE_URL + `/courses/${courseId}/contents/${contentId}`, {
            withCredentials: true
        });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const enhanceCourseContent = async ({ courseId, contentId }: { courseId: string, contentId: string }) => {
    try {
        const { data } = await axios.put(BASE_URL + `/courses/${courseId}/contents/${contentId}`, {}, {
            withCredentials: true
        });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const logout = async () => {
    try {
        await axios.get(BASE_URL + "/auth/logout", {
            withCredentials: true
        });
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const deleteCourse = async ({ courseId }: { courseId: string }) => {
    try {
        await axios.delete(BASE_URL + `/courses/${courseId}`, {
            withCredentials: true
        });
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}

export const updateCourseTitle = async ({ courseId, title }: { courseId: string, title: string }) => {
    try {
        const { data } = await axios.put(BASE_URL + `/courses/${courseId}`, { title }, {
            withCredentials: true
        });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error or server is unreachable", code: "NETWORK_ERROR" };
    }
}
