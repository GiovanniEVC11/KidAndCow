<template>
  <div class="production">
    <h1>Datos de Produccion</h1>

    <section> 
      
    </section>

    <section class="data" >
      <!-- v-on: = @ / v-bind: = : -->
      <button v-on:click="showForm = !showForm, id_update = '0' " class="mdc-icon-button material-icons" v-bind:key="showForm"> {{ showForm ? 'remove_circle' : 'add_circle' }} </button>
      
      <transition name="fade">
        <FormProduction v-if="showForm" v-bind:idProp="id_update" :key="id_update"/>
      </transition>

      <table class="table table-striped table-condensed"> <!-- Formato tabla con rayas grises-->
        <thead class="thead-dark">
          <tr>
            <th scope="col"> # Tina </th>
            <th scope="col"> Producto </th>
            <th scope="col"> # Rejas </th>
            <th scope="col"> Piezas +/- </th>
            <th scope="col"> Peso (Kg)</th>
            <th scope="col"> Acciones </th>
          </tr>    
        </thead>
        <tbody>
          <tr v-for="(item, i) in items" :key="item._id"> <!-- :key to give an ID to DOM element-->
            <th scope="row">{{ item.tub }}</th>
            <td>{{ item.product }}</td>  
            <td>{{ item.bars }}</td> 
            <td>{{ item.pieces }}</td> 
            <td>{{ item.weight }}</td> 
            <!--Actions-->
            <td><i class="material-icons" @click="updateItem(item)">create</i> <i class="material-icons" @click="removeItem(item, i)">delete_forever</i> </td>
          </tr>            
        </tbody>
      </table>
    </section>

    <section> 
      <table class="table table-dark"> 
        <thead>
          <tr>
            <th scope="col"> Producto </th>
            <th scope="col"> Total Piezas </th>
          </tr>
        </thead>

        <tbody> 
          <tr v-for="(total, i) in totalProducts" :key="i"> <!-- :key to give an ID to DOM element-->
            <th scope="row">{{ total._id }}</th>
            <td>{{ total.total }}</td> 
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
      showForm: false, // Form 
      id_update: "0",
      totalProducts: []
    };
  }, 
  mounted() {
      this.productionTable();
      this.totalByProduction();
      if(this.showForm == false){
          this.id_update = "0";
      }
  },
  methods:{
    async removeItem(item, i){
      await axios.delete(API + "/" + item._id); 
      this.items.splice(i, 1);  // Remove DOM Element from table 
      this.totalByProduction();
    },
    updateItem(item){
      this.id_update = item._id;
      if(this.id_update != '0'){
        this.showForm = !this.showForm;
      }
      console.log('id_update:', this.id_update);
    },
    async productionTable(){
      let res = await axios.get(API);
      this.items = res.data; //.then( (response) => { this.items = response.data , console.log(response.data) } ).catch( (err) => { console.log('API error:', err) } );
      console.log(this.items);
    },
    async totalByProduction(){
      let r = await axios.get(API + "/aggregate");
      this.totalProducts = r.data;
    }
  }
}

</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
/* .fade-leave-active in <2.1.8  */
.fade-enter, .fade-leave-to  {
  opacity: 0
}
</style>

