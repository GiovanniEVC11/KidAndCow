<template>

    <section class="modal" id="FormProductionModal">
      <div class="modal-dialog">
        <div class="modal-content">
          
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">{{ nameForm }}</h4>
              <button type="button" class="close" data-dismiss="modal" @click="closeForm()">&times;</button>
            </div>
          
            <form id="form" class="modal-body">  
                <!-- <input type="text" v-model="idProp"> Etiqueta de Prueba --> 
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
            </form>
            
            <!-- Modal footer -->
            <div class="modal-footer"> <!-- @ means v-on / :name_attribute means v-bind:name_attribute --> 
                                    <!-- Validate Name Action by Id passed from parent; style bootstrap; Validate The Action to Execute with the Id passed from Parent -->
              <input type="submit" :value="idProp == 0 ? 'Registrar': 'Modificar'" class="btn btn-primary btn-lg btn-block" data-dismiss="modal" @click="idProp == 0 ? addForm() : updateForm()">  
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeForm()">Close</button>
            </div>

        </div>
      </div>
    </section>    

</template>

<script>
import axios from "axios";
const API = "/api/produccion";

export default {
  name: 'FormProduction',
  data() {
    return {
      data: {
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
    idProp: String,
    nameForm: String
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
      this.sendUpDate();
    },
    async updateForm(){
      console.log("updateForm");
      await axios.put(API + "/" + this.data._id, this.data);
      this.sendUpDate();
    },
    closeForm() {
      this.$emit('closeForm'); // Event to close Modal Window
    },
    sendUpDate() {
      this.$emit('setUpDate'); // Event to Update Data
    }
  }
}
</script>