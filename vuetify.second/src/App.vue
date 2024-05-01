<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Primer vuetify"></v-app-bar>

    <v-navigation-drawer >
      <v-list>
        <v-list-item title="Secciones"></v-list-item>
        <v-container>
          <v-list-item prepend-icon="mdi-home"  @click="showC" title="Home"></v-list-item>
      <v-list-item prepend-icon="mdi-image" @click="showA"  title="Imagenes"></v-list-item>
      <v-list-item prepend-icon="mdi-table" @click="showB" title="Tabla de datos"></v-list-item>
        
          
        </v-container>
        
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <component-b v-if="showComponentB" /><component-a v-else-if="showComponentA" /><component-c v-else-if="showComponentC" />
      
    </v-main>
  </v-layout>
</template>
<script>
  import ComponentA from './components/imagenes.vue';
  import ComponentB from './components/tabla2.vue';
  import ComponentC from './components/HelloWorld.vue';
  export default {
    components: {
      ComponentA,
      ComponentB,
      ComponentC
    },
    data() {
      return {
        showComponentA: false,
        showComponentB: false,
        showComponentC: true,
      };
    },
    methods: {
      showA(){
        this.showComponentA = true,
        this.showComponentB = false,
        this.showComponentC = false
      },
      showB(){
        this.showComponentA = false,
        this.showComponentB = true,
        this.showComponentC = false
      },
      showC(){
        this.showComponentA = false,
        this.showComponentB = false,
        this.showComponentC = true
      }
    }
  }
  </script>