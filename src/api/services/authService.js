import api from '@/api/api';

const AUTH_ENDPOINTS = {
    LOGIN: '/Auth/login', 
    REGISTER: '/Auth/register',
};

export async function loginUser(email, password) {
    try {
        const response = await api.post(AUTH_ENDPOINTS.LOGIN, { 
            email, 
            password 
        });

        return response.data; 
        
    } catch (error) {
        console.error("Erro no login:", error.response || error);
        
        if (error.response && error.response.status === 401) {
            throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
        }
        throw new Error(error.response?.data?.message || "Ocorreu um erro ao tentar logar.");
    }
}

export async function registerUser(userData) {
    const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || '',
        imageURL: userData.imageURL || '',
        address: {
            zipCode: userData.zipCode || '',
            street: userData.street || '',
            number: userData.number || '',
            complement: userData.complement || '',
            city: userData.city || '',
            state: userData.state || '',
            country: userData.country || 'Brasil'
        }
    };

    try {
        const response = await api.post(AUTH_ENDPOINTS.REGISTER, payload);
        
        return response.data; 
        
    } catch (error) {
        console.error("Erro no cadastro:", error.response || error);

        if (error.response && error.response.status === 409) {
            throw new Error("Este e-mail já está cadastrado.");
        }
        throw new Error(error.response?.data?.message || "Ocorreu um erro ao tentar cadastrar.");
    }
}