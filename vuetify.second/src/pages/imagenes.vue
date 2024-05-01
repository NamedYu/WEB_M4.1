<template>
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="joke"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                :src="card.src"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
              <v-card-title class="text-white joke-title">{{ joke }}</v-card-title>
              </v-img>
              
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>
  
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>
  <script>
    export default {
      
      data: () => ({
        cards: [
          { title: 'Picture 1', src: 'https://picsum.photos/900/675', flex: 12 },
          // { title: 'Picture 2', src: 'https://picsum.photos/900/674', flex: 6 },
          // { title: 'Picture 3', src: 'https://picsum.photos/900/676', flex: 6 },
        ],
        joke:''
      }),
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
  <style scoped>
  .joke-title {
    white-space: normal;
  }
  </style>