Vue.component ('procesador', {
 props: ['procesador'],
 data: function() {
  return {
  }},
  template: '<div class="procesador"> {{"Procesador " + procesador.getDireccion() }} </div>'
});

Vue.component ('crossbar', {
  props: ['crossbar'],
  data: function() {
    return{
    }},
    template: '<div class="crossbar">  </div>'
})

Vue.component ('slotMemoria', {
props: ['slotMemoria'],
data: function(){
  return{
}},
  template: '<div class="slotMemoria">{{slotMemoria.getId()}}</div>'
})

Vue.component ('memoria', {
props: ['memoria'],
data: function(){
  return{
}},
  template: '<div class="memoria"> <div class="col-12"> Memoria  </div> <slotMemoria v-for="so in memoria.slots" v-bind:slotMemoria=so> </slotMemoria> </div>'
})


Vue.component ('etapa', {
  props: ['etapa'],
  data: function() {
    return{
    }},
    template: '<div class="row" style="height:100%;"> <div class="col-8 my-col etapa"> {{"Etapa " + etapa.getId()}} </div> <div class="list-cross col-4 my-col"> <crossbar v-for="co in etapa.crossbar" v-bind:crossbar=co> </crossbar> </div> </div>'
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
    memoria: null,

  },

   watch: {
    nroproc: function(){
      this.procesadores=[];
      this.etapas=[];
      this.memoria=null;
      if (this.nroproc>0){
      for (var i = 0; i < this.nroproc; i++)
        this.procesadores.push(new Procesador(i,this.nroEtapas));
      for (var i = 0; i < this.nroEtapas; i++)
        this.etapas.push(new Etapa(i,this.nroEtapas));
      this.memoria = new Memoria(this.nroEtapas);
      }
    }
},
  
  computed: {
    nroEtapas: function (){
      return Math.ceil(Math.log(this.nroproc)/Math.log(2)) ;
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
      <input type="number" v-model= "nroproc" placeholder="multiplo de 2" step="2" min="0" style="width:100px"></input>
      <label for="nroproc">Procesadores activos:</label>
      <input type="number" v-model= "nroprocactivos" placeholder="multiplo de 2" step="2" min="0" style="width:100px"></input>
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
    
    <div class="container">
      <div class="row display-flex">
        <div class="my-col">      
          <procesador v-for= "po in procesadores" v-bind:procesador=po> 
          </procesador>
        </div>
        <div v-for= "eo in etapas" class="col my-col">
          <etapa v-bind:etapa=eo>
          </etapa>
        </div>
        <div class="col my-col">
        <memoria v-if="memoria!== null" v-bind:memoria=memoria></memoria>
        </div>
      </div>
    </div>

  </div>`

});



