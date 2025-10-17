<template>
  <div>
    <h1>Página de Planos</h1>
    
    <img 
      :src="urlImagemPlano" 
      alt="Imagem do plano"
      class="imagem-plano"
    />
    
    <p>Conteúdo da página de planos...</p>
  </div>
</template>

<script>
export default {
  name: 'PlanosView',
  data() {
    return {
      // A URL da sua imagem está definida aqui:
      urlImagemPlano: 'https://gerarmemes.s3.us-east-2.amazonaws.com/memes/thumb/5cd72a3b.webp' 
    }
  },
  // Se fosse carregar a URL da API, você atualizaria essa variável no created()
}
</script>

<style scoped>
/* Estilos para controle de tamanho */
.imagem-plano {
  /* Limita a largura máxima para que a imagem não seja muito grande */
  max-width: 400px; 
  height: auto;
  display: block; /* Garante que a imagem se comporte como um bloco */
  margin: 20px 0;
}
</style>