<template>

    <section id="FormProduction" class="">

        <form id="form" class="container"> 
          
          <div class="row row-cols-2">
            <div class="col-6">
              <label for="product">Producto:</label>
              <select name="product" required class="form-control" v-model="params.product">
                  <option disabled value="">Seleccione un elemento</option>
                  <option>Queso</option>
                  <option>Queso</option>
                  <option>Crema</option>
              </select>  
            </div>
          </div>

          <div class="row row-cols-2">
             <div class="col-6">
                  <label for="bars">Rejas:</label>
                  <input type="number" name="bars" placeholder="Cantidad" required class="form-control" v-model="params.bars">
              </div>  
              <div class="col-6">  
                  <label for="pieces">Piezas:</label>
                  <input type="number" name="pieces" placeholder="Cantidad" required class="form-control" v-model="params.pieces">
              </div>
          </div>
 
          <div class="row row-cols-2">
              <div class="col-6">
                  <label for="tub">No. Tina:</label>
                  <input type="number" name="tub" placeholder="Cantidad" required class="form-control" v-model="params.tub">
              </div>
              <div class="col-6">
                  <label for="weight">Peso:</label>
                  <input type="number" name="weight" placeholder="Kilogramos" required class="form-control" v-model="params.weight">
              </div>
          </div>

          <div class="form-group">
              <label for="comments">Comentarios:</label>
              <textarea name="comments" rows="5" cols="5" placeholder="Escribe un comentario" class="form-control" v-model="params.comments"/>
          </div>

          <input type="submit" value="Registrar" class="btn btn-primary btn-lg btn-block" @click="addForm">     

        </form>    

    </section>    

</template>

<script>
import axios from "axios";
const API = "/api/produccion/";

export default {
  name: 'FormProduction',
  data() {
    return {
      params: {
        product: '',
        bars: '',
        pieces: '',
        tub: '',
        weight: '',
        comments: ''
      }
    };
  },
  props:{
    parentData: Object
  },
  methods: {
    addForm(){
      let res =  axios.post(API, this.params);
      console.log(res.data);
    }
  }
}
</script>