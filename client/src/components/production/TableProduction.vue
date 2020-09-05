<template>

    <section class="">
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
    
</template>

