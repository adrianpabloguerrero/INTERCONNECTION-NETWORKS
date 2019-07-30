Vue.component ('procesador', {
 props: ['procesador'],
 data: function() {
  return {
  }},
  template: '<div class="procesador"> {{"Procesador " + procesador.getDireccion() }} </div>'
});


Vue.component ('etapa', {
  props: ['etapa'],
  data: function() {
    return{
    }},
    template: '<div class="etapa"> {{"Etapa" + etapa.getId() }} </div>'
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Simulador de redes de interconexion',
    image: 'logo.jpeg',
    nroproc: 0,
    periodicidad: '',
    nroprocactivos: '',
    configuracion: '',
    procesadores: [],
    etapas: [],
  },

   watch: {
    nroproc: function(){
      this.procesadores=[];
      this.etapas=[];
      for (i = 0; i < this.nroproc; i++)
        this.procesadores.push(new Procesador(i,this.nroEtapas));
      for (i = 0; i < this.nroEtapas; i++)
        this.etapas.push(new Etapa(i));
    },

   },
  
  computed: {
    nroEtapas: function (){
      return Math.log(this.nroproc)/Math.log(2) ;
    }
  },

  methods: {
    multiplicar(){
      this.contador = this.retornar(this.contador);  
    },
    retornar(a){
      return a*3;
    }
  },
  
  template: `
  <div> 
  <div class="header"> 
      {{message}}
      <img class="image" v-bind:src="image" />  
  </div>
  <div class="imputs">
    <label for="nroproc">Numero de procesadores:</label>
    <input type="number" v-model= "nroproc" placeholder="multiplo de 2" step="2" min="0" style="width:100px">
    <label for="nroproc">Procesadores activos:</label>
    <input type="number" v-model= "nroprocactivos" placeholder="multiplo de 2" step="2" min="0" style="width:100px">
    <span>Periodicidad de los requerimientos</span>
    <select v-model="periodicidad">
    <option>Periodico</option>
    <option>Unica vez</option>
    <option>Al azar</option>
    </select>

    <span>Configuracion de direccion de memoria</span>
    <select v-model="configuracion">
    <option>Direccion unica</option>
    <option>Direcciones al azar</option>
    <option>Lista de direcciones</option>
    </select>

  </div>

  
  
   
  
  <div class="container-fluid">
  <div class="row justify-content-center">
    <div class="col">      
        <procesador v-for= "po in procesadores" v-bind:procesador=po> </procesador>
      </div>
      <div v-for= "eo in etapas" class="col">
      <etapa v-bind:etapa=eo> </etapa>
    </div>
  </div>
</div>

  </div>`

});



