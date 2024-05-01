<template>
    <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
      elevation="4"
      height="250"
      rounded
      max-width="800"
      width="100%"
    >
      <div>
        <h2 class="text-h4 font-weight-black text-orange">JOKE!</h2>
  
        <div class="text-h5 font-weight-medium mb-2" >
            {{ joke }}
        </div>
      </div>
    </v-sheet>
  </template>
<script>
    export default {
  data() {
    return {
      joke: '' // 初始化笑话为空字符串
    };
  },
  mounted() {
    // 在组件加载后获取笑话数据
    this.fetchJoke();
  },
  methods: {
    fetchJoke() {
      const url = 'https://api.chucknorris.io/jokes/random';

      // Realizar la solicitud HTTP GET utilizando fetch
      fetch(url)
      .then(response => {
          // Verificar si la respuesta es exitosa
          if (!response.ok) {
          throw new Error('No se pudo obtener la broma de Chuck Norris');
          }
          // Convertir la respuesta a JSON
          return response.json();
      })
      .then(data => {
          // Actualizar笑话数据
          this.joke = data.value;
      })
      .catch(error => {
        console.error('Ocurrió un error al realizar la solicitud:', error.message);
      });
    }
  }
}
</script>