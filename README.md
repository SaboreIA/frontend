# Starbite Frontend

# Integrantes

`Estevão Alves dos Santos RA: 1990000`
`Guilherme Dorce de Britto RA: 1991866`
`Rodrigo Shinji Yamashita RA: 2001443`
`Vanessa Kaori Kurauchi RA: 2002344`

## Scripts

- `npm install` – instala dependências
- `npm run dev` – inicia o servidor Vite
- `npm run build` – gera o bundle de produção
- `npm run preview` – serve o build gerado

## Cadastro de Restaurantes

- Botão fixo no header (desktop e mobile) aponta para `/restaurantes/cadastrar`.
- A rota utiliza `RestaurantCreateView.vue`, dividida em seções menores em `src/components/restaurant_form/`.
- O formulário primeiro cria o restaurante via `POST /restaurants` (texto/endereço/horários/tags) e **depois** envia as imagens via `POST /Restaurants/:id/upload-all-images` usando `FormData` (`coverImage`, `image1`, `image2`, `image3`).
- A lista de tags é carregada de `GET /Tag` e o usuário pode escolher até 10 tags, exibidas como botões.
- Todas as entradas de imagem passam por um modal de recorte (`src/components/restaurant_form/ImageCropInput.vue`) que reutiliza o mesmo UX do perfil de usuário (Cropper.js) antes de subir para o Cloudinary.
- O campo de CEP conta com o botão “Buscar CEP”, que usa `src/utils/address.js#fetchAddressByCep` (ViaCEP) para popular rua, bairro, complemento, cidade e estado automaticamente.
- Body enviado para `POST /restaurants` (sem imagens, pois elas seguem no upload dedicado):

```json
{
	"address": {
		"city": "Marília",
		"country": "Brasil",
		"number": "497",
		"state": "SP",
		"street": "Rua XV de Novembro",
		"zipCode": "17500-050",
		"complement": "Esquina com a Rua Dom Pedro - Centro"
	},
	"name": "Don Mantelli Restaurante",
	"phoneNumber": "(14) 3304-0007",
	"description": "...",
	"site": "https://www.donmantelli.com.br",
	"menu": "https://www.instagram.com/donmantelli/",
	"openDay": 1,
	"closeDay": 0,
	"openTime": "11:00",
	"closeTime": "15:00",
	"tagIds": [4153, 4308]
}
```

- Após receber o `id` do restaurante criado, o front envia as imagens selecionadas para `/Restaurants/:id/upload-all-images` utilizando `src/api/restaurants.js#uploadRestaurantImages`.

Para testar localmente:

```powershell
npm install
npm run dev
```

Acesse `http://localhost:5173` e use o botão do header para abrir o formulário.


