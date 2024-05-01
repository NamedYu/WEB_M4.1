<!-- httpss://jsonplaceholder.typicode.com/posts -->
<!-- httpss://jsonplaceholder.typicode.com/users -->
<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[{ key: 'calories', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2"
                color="primary"
                dark
                v-bind="props"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.id"
                        label="ID"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.numeroSerie"
                        label="Serie"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.numeroInventarioUABC"
                        label="Inventario"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.tipo"
                        label="Tipo"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.descripcion"
                        label="Descripcion"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.ubicacion"
                        label="Ubicacion"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.responsable"
                        label="Responsable"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                      <v-text-field
                        v-model="editedItem.imagen"
                        label="Imagen"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="7"
                    >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Recargar
        </v-btn>
      </template>
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
        //   {
        //     title: 'Dessert (100g serving)',
        //     align: 'start',
        //     sortable: false,
        //     key: 'name',
        //   },
          { title: 'id', key: 'id'},
          { title: 'serie', key: 'numeroSerie' },
          { title: 'InventarioUABC', key: 'numeroInventarioUABC' },
          { title: 'tipo', key: 'tipo' },
          { title: 'descripcion', key: 'descripcion' },
          { title: 'ubicacion', key: 'ubicacion' },
          { title: 'responsable', key: 'responsable' },
          { title: 'imagen', key: 'imagen' },
          { title: 'Actions', key: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          id: '',
          numeroSerie: '',
          numeroInventarioUABC: '',
          tipo: '',
          descripcion:'',
          ubicacion:'',
          responsable:'',
          imagen: '',
        },
        defaultItem: {
          id: '',
          numeroSerie: '',
          numeroInventarioUABC: '',
          tipo: '',
          descripcion:'',
          ubicacion:'',
          responsable:'',
          imagen: '',
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      methods: {
        async fetchTodos() {
          try {
            const response = await fetch('https://localhost:4000/activos'); // Esperar la respuesta
            if (!response.ok) {
              throw new Error('Failed to fetch data from server');
            }
            const data = await response.json(); // Extraer datos JSON de la respuesta
            this.desserts = data.map(activo => ({
              id: activo.id,
              numeroSerie: activo.numeroSerie,
              numeroInventarioUABC: activo.numeroInventarioUABC,
              tipo: activo.tipo,
              descripcion: activo.descripcion,
              ubicacion: activo.ubicacion,
              responsable: activo.responsable,
              imagen: activo.imagen
            }));
            console.log(this.desserts);
          } catch (error) {
            console.error('Error fetching data from server:', error.message);
          }
      },

        initialize () {
            console.log("HOLA")
            this.fetchTodos();
        },
  
        editItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          fetch(`https://localhost:4000/activos/id/${this.editedItem.id}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete post');
            }
            // 从数据数组中删除选定的项目
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
          })
          .catch(error => {
            console.error('Error deleting post:', error.message);
          });
          // this.desserts.splice(this.editedIndex, 1)
          // this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        async save() {
            try {

              if (this.editedIndex > -1) {
                const response = await fetch(`https://localhost:4000/activos/id/${this.editedItem.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(this.editedItem)
                });

                if (!response.ok) {
                  throw new Error('Failed to update activo');
                }

                this.desserts.splice(this.editedIndex, 1, this.editedItem);
                this.close();
              } else {
            const response = await fetch('https://localhost:4000/activos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.editedItem)
            });
            if (!response.ok) {
                throw new Error('Failed to create activo');
            }
            this.desserts.push({
                id: this.editItem.id,
                numeroSerie: this.editItem.numeroSerie,
                numeroInventarioUABC: this.editItem.numeroInventarioUABC,
                tipo: this.editItem.tipo,
                descripcion: this.editItem.descripcion,
                ubicacion: this.editItem.ubicacion,
                responsable: this.editItem.responsable,
                imagen: this.editItem.imagen
            });
            this.close();
        }
    } catch (error) {
        console.error('Error saving activo:', error.message);
    }
    this.fetchTodos();        
  }
          
      },
    }
  </script>
