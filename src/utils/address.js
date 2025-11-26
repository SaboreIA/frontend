const VIA_CEP_URL = 'https://viacep.com.br/ws';

export const sanitizeCep = (value = '') => String(value).replace(/\D/g, '');

export async function fetchAddressByCep(rawCep) {
  const cep = sanitizeCep(rawCep);

  if (cep.length !== 8) {
    throw new Error('Informe um CEP válido com 8 dígitos.');
  }

  const response = await fetch(`${VIA_CEP_URL}/${cep}/json/`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Não foi possível consultar o CEP no momento.');
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error('CEP não encontrado. Verifique o número informado.');
  }

  return {
    zipCode: cep,
    street: data.logradouro || '',
    complement: data.complemento || '',
    neighborhood: data.bairro || '',
    city: data.localidade || '',
    state: data.uf || '',
    ibge: data.ibge || '',
  };
}
