<template>
  <div class="production">
    <h1>Datos de Produccion</h1>

    <section class="data" >
      <!-- v-on: = @ / v-bind: = : --> <!--  -->
      <button id="FormProductionId" type="button" class="btn btn-labeled btn-primary px-3" v-on:click="showForm = !showForm" data-toggle="modal" data-target="#FormProductionModal"><i class="fa fa-plus" aria-hidden="true"></i></button>
      
      <!-- <transition name="fade"> --> 
        <!-- Validate if show or not the children component; Pass the Id to interact with children component; Validate to pass a name to the Form; Activate this function if it's called from children -->
        <FormProduction v-if="showForm" v-bind:idProp="id_update" :key="id_update" v-bind:nameForm="id_update == '0' ? nameForm[0] : nameForm[1]" @closeForm="setInitialValues()" @setUpDate="upDate()" />
      <!-- </transition> -->

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
          <tr v-for="(item) in items" :key="item._id"> <!-- :key to give an ID to DOM element-->
            <th scope="row">{{ item.tub }}</th>
            <td>{{ item.product }}</td>  
            <td>{{ item.bars }}</td> 
            <td>{{ item.pieces }}</td> 
            <td>{{ item.weight }}</td> 
            <!--Actions-->
            <td> 
              <button type="button" class="btn btn-primary px-3" @click="updateItem(item)" data-toggle="modal" data-target="#FormProductionModal"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
              <button type="button" class="btn btn-danger px-3" @click="removeItem(item)"><i class="fa fa-trash-o" aria-hidden="true"></i></button> 
            </td>
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
    FormProduction //: () => import('@/components/production/FormProduction.vue')  // Other way to give FormProduction
  },
  data() {
    return {
      items: [], // Object Data from API 
      showForm: false, // Form 
      id_update: "0",
      nameForm: ["Registrar nueva Producción","Editar Registro de Producción"],
      totalProducts: []
    };
  }, 
  mounted() {
      this.upDate();
      if(this.showForm == false){
          this.id_update = "0";
      }
  },
  methods:{
    setInitialValues(){ this.showForm = false; this.id_update = '0';},
    updateItem(item){
      this.id_update = item._id; this.showForm = !this.showForm;
      console.log("Show Form:", this.showForm, "id_update:", this.id_update);  
    },
    async removeItem(item, i){
      await axios.delete(API + "/" + item._id); 
      this.items.splice(i, 1);  // Remove DOM Element from table 
      this.upDate();
    },
    async productionTable(){
      let res = await axios.get(API);
      this.items = res.data; //.then( (response) => { this.items = response.data , console.log(response.data) } ).catch( (err) => { console.log('API error:', err) } );
      //console.log("ProductionTable:", this.items);
    },
    async totalByProduction(){
      let res = await axios.get(API + "/aggregate");
      this.totalProducts = res.data;
      //console.log("TotalProdcution:", this.totalProducts);
    },
    async upDate(){
      this.setInitialValues();
      await Promise.all([this.productionTable(), this.totalByProduction()]);
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

