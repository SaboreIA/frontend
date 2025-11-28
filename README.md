# Starbite Frontend

## Integrantes

- `Estevão Alves dos Santos RA: 1990000`
- `Guilherme Dorce de Britto RA: 1991866`
- `Rodrigo Shinji Yamashita RA: 2001443`
- `Vanessa Kaori Kurauchi RA: 2002344`

---

## Entidades do Sistema

### **User**
Representa os usuários do sistema.  
Contém informações como:
- Nome, email e senha  
- Dados de perfil  
- Relações com avaliações feitas  
- Lista de restaurantes favoritados  

### **Restaurant**
Cadastro dos restaurantes disponíveis na plataforma.  
Inclui:
- Nome, descrição, telefone e horários  
- Relação com endereço  
- Avaliações publicadas pelos usuários  
- Tags indicando o tipo de culinária  

### **Address**
Modelo de endereço utilizado tanto por **usuários** quanto por **restaurantes**.  
Contém:
- Rua, número, bairro, cidade, estado, CEP  
- Relação direta com um usuário ou um restaurante  

### **Tag**
Categorias / tipos de culinária.  
Exemplos:
- Japonês  
- Brasileira  
- Pizza  
- Churrasco  
- Vegano  
Um restaurante pode ter várias tags.

### **Product**
Produtos ou pratos oferecidos pelos restaurantes.  
Inclui:
- Nome do prato  
- Preço  
- Descrição  
- Imagem  
- Relação com o restaurante ao qual pertence  

### **Review**
Avaliações feitas pelos usuários sobre restaurantes.  
Armazena:
- Nota (rating)  
- Comentário  
- Data da avaliação  
- Usuário autor  
- Restaurante avaliado  

### **Favorite**
Relaciona um usuário aos restaurantes que ele marcou como favoritos.  
É uma tabela simples que mapeia:
- `userId`  
- `restaurantId`  

---

## Scripts

- `npm install` – instala dependências  
- `npm run dev` – inicia o servidor Vite  
- `npm run build` – gera o bundle de produção  
- `npm run preview` – serve o build gerado  

---

## Para testar localmente

```powershell
npm install
npm run dev
```

Para testar localmente:

```powershell
npm install
npm run dev
```

Acesse `http://localhost:5173` e use o botão do header para abrir o formulário.





