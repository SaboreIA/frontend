# Starbite Frontend

## Scripts

- `npm install` – instala dependências
- `npm run dev` – inicia o servidor Vite
- `npm run build` – gera o bundle de produção
- `npm run preview` – serve o build gerado

## Cadastro de Restaurantes

- Botão fixo no header (desktop e mobile) aponta para `/restaurantes/cadastrar`.
- A rota utiliza `RestaurantCreateView.vue`, dividida em seções menores em `src/components/restaurant_form/`.
- O formulário envia exatamente o body abaixo para `POST /restaurants` (via `src/api/restaurants.js`):

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
	"coverImageUrl": "https://exemplo.com/capa.jpg",
	"imageUrl1": "https://exemplo.com/img1.jpg",
	"imageUrl2": "https://exemplo.com/img2.jpg",
	"imageUrl3": "https://exemplo.com/img3.jpg",
	"openDay": 1,
	"closeDay": 0,
	"openTime": "11:00",
	"closeTime": "15:00",
	"tagIds": [4153, 4308]
}
```

Para testar localmente:

```powershell
npm install
npm run dev
```

Acesse `http://localhost:5173` e use o botão do header para abrir o formulário.
