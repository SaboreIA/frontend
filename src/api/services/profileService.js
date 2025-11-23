import api from '@/api/api';

const PROFILE_ENDPOINTS = {
	GET_PROFILE: (userId) => `/User/${userId}`, 
	UPDATE_PROFILE: (userId) => `/User/${userId}`, 
	DELETE_PROFILE: (userId) => `/User/${userId}`,
};

export async function fetchUserProfile(userId) {
    if (!userId) {
        throw new Error("ID do usuário é obrigatório para buscar o perfil.");
    }
    try {
        const response = await api.get(PROFILE_ENDPOINTS.GET_PROFILE(userId));
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar perfil:", error.response || error);
        throw new Error("Não foi possível carregar os dados do perfil.");
    }
}

export async function updateProfile(userId, updatedData) {
    if (!userId) {
        throw new Error("ID do usuário é obrigatório para atualizar o perfil.");
    }

	const normalizedImageUrl = updatedData.imageUrl ?? updatedData.imageURL ?? '';
	const address = updatedData.address || {};

	const payload = {
		name: updatedData.name,
		email: updatedData.email,
		phone: updatedData.phone || '', 
		password: updatedData.password,
		imageUrl: normalizedImageUrl,
		active: typeof updatedData.active === 'boolean' ? updatedData.active : true,
		address: {
	           zipCode: address.zipCode || '',
	           street: address.street || '',
	           number: address.number || '',
	           complement: address.complement || '',
	           city: address.city || '',
	           state: address.state || '',
	           country: address.country || 'Brasil'
	       }
	};

	if (!payload.password?.trim()) {
		delete payload.password;
	}
    
    try {
        const response = await api.put(PROFILE_ENDPOINTS.UPDATE_PROFILE(userId), payload); 
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error.response || error);
        throw new Error(error.response?.data?.message || "Ocorreu um erro ao salvar as alterações.");
    }
}

export async function deleteProfile(userId) {
	if (!userId) {
		throw new Error("ID do usuário é obrigatório para excluir o perfil.");
	}

	try {
		await api.delete(PROFILE_ENDPOINTS.DELETE_PROFILE(userId));
	} catch (error) {
		console.error("Erro ao excluir perfil:", error.response || error);
		throw new Error(error.response?.data?.message || "Não foi possível excluir a conta. Tente novamente." );
	}
}