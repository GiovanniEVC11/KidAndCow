<template>

    <section id="FormProduction" >

      <input type="text" v-model="idProp">

      <form id="form" class="container">  
          <div class="row row-cols-2">
            <div class="col-6">
              <label for="product">Producto:</label>
              <select name="product" class="form-control" v-model="data.product">
                  <option disabled value="Null">Seleccione un Producto</option>
                  <option v-for="option in options" v-bind:value="option.text" :key="option.value">
                      {{ option.text }} 
                  </option>
              </select>  
            </div>
          </div>

          <div class="row row-cols-2">
              <div class="col-6">
                  <label for="tub">No. Tina:</label>
                  <input type="number" name="tub" class="form-control" :placeholder="data.tub == 0 ? 'Cantidad Entera (+)' : ''" v-model="data.tub" >
              </div>
              <div class="col-6">
                  <label for="bars">Rejas:</label>
                  <input type="number" name="bars" class="form-control" :placeholder="data.bars == 0 ? 'Cantidad Entera (+)': ''" v-model="data.bars" >
              </div>  
          </div>
 
          <div class="row row-cols-2">
              <div class="col-6">  
                  <label for="pieces">Piezas:</label>
                  <input type="number" name="pieces" class="form-control" :placeholder="data.pieces == 0 ? 'Cantidad Entera (+/-)': ''" v-model="data.pieces" >
              </div>
              <div class="col-6">
                  <label for="weight">Peso:</label>
                  <input type="number" step="any" name="weight" class="form-control" :placeholder="data.weight == 0 ? 'Cantidad Decimal (Kg)': ''" v-model="data.weight">
              </div>
          </div>

          <input type="submit" :value="idProp == 0 ? 'Registrar': 'Modificar'" class="btn btn-primary btn-lg btn-block" @click="idProp == 0 ? addForm() : updateForm()">    
          <!-- @ means v-on / :name_attribute means v-bind:name_attribute --> 
      </form>  

    </section>    

</template>

<script>
import axios from "axios";
const API = "/api/produccion";

export default {
  name: 'FormProduction',
  data() {
    return {
      data:{
        _id: this.idProp,
        tub: 0 ,
        product: "Null",
        bars:  0,
        pieces: 0,
        weight: 0
      },
      options: [
        { text: 'Queso 3kg', value: '1' },
        { text: 'Queso 1kg', value: '2' },
        { text: 'Crema', value: '3' }
      ]
    };
  },
  props: {
    idProp: String
  },
  async mounted() {
    console.log("Data Form", this.data);
    /* Identify the Form Mode */
    if(this.idProp != 0){
      await axios.get(API + "/modify/" + this.data._id)
          .then( (response) => { this.data = response.data , console.log(response.data) } )
          .catch( (err) => { console.log('API error:', err) } );
    }else{
      this.$delete(this.data, '_id');
    }

  },
  methods: {
    async addForm(){
      console.log("addForm");
      await axios.post(API, this.data); //.then( () => { console.log(this.data) } ).catch( (err) => { console.log('API error:', err) } );
      
    },
    async updateForm(){
      console.log("updateForm");
      await axios.put(API + "/" + this.data._id, this.data);
    }
  }
}
</script>