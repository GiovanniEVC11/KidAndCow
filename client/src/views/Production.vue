<template>
  <div class="production">
    <h1>Datos de Produccion</h1>

    <section class="data">
      
      <button v-on:click="showForm = !showForm" class="mdc-icon-button material-icons" v-bind:key="showForm">
        {{ showForm ? 'remove_circle' : 'add_circle' }} </button>
      <transition name="fade">
        <FormProduction v-if="showForm"/>
      </transition>

      <table class="table table-striped table-condensed"> <!-- Formato tabla con rayas grises-->
        <thead class="thead-dark">
          <tr>
            <th scope="col"> # Tina </th>
            <th scope="col"> # Rejas </th>
            <th scope="col"> Piezas +/- </th>
            <th scope="col"> Producto </th>
            <th scope="col"> Peso </th>
            <th scope="col"> Acciones </th>
          </tr>    
        </thead>
        <tbody>
          <tr v-for="(item, i) in items" :key="item._id"> <!-- :key to give an ID to DOM element-->
              <td>{{ item.product }}</td> 
              <td>{{ item.bars }}</td> 
              <td>{{ item.pieces }}</td> 
              <td>{{ item.tub }}</td> 
              <td>{{ item.weight }}</td> 
              <!--Actions-->
              <td><i class="material-icons" @click="updateItem(item)" >create</i> <i class="material-icons" @click="removeItem(item, i)">delete_forever</i> </td>
          </tr>            
        </tbody>
      </table>
    </section>      
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import FormProduction from '@/components/production/FormProduction.vue'
const API = "/api/produccion";

export default {
  name: 'Production',
  components: {
    FormProduction //: () => import('@/components/production/FormProduction.vue')
  },
  data() {
    return {
      items: [], // Object Data from API 
      showForm: false
    };
  }, 
  async mounted() {
    axios.get(API).then( (response) => { this.items = response.data , console.log(response.data) } ).catch( (err) => { console.log('API error:', err) } );
  },
  methods:{
    removeItem(item, i){
      axios.delete(API + "/" + item._id); 
      this.items.splice(i, 1);  // Remove DOM Element from table 
    }
  }
}

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>

