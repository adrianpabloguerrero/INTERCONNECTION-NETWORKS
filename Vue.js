
Vue.component ('prueba', {
  data: function() {
    return {
    a: 2
  }},
  template: '<button> {{"soy " + a }} </button>'
});

Vue.component ('sistema', {
  data: function() {
    return {
      cantidad : 2 
    }
  },
  template: '<div> <prueba v-for= "i in cantidad"> </prueba></div>'
});

 
var app = new Vue({
  el: '#app',
  data: {
    message: 'Simulador de redes de interconexion',
    image: 'logo.jpeg',
    nroproc: 0,
    periodicidad: '',
    nroprocactivos: '',
    configuracion: '',
    contador: 2,
    etapas: '0'
  },
  
  computed: {
    b: function (){
      return this.contador + 1;
    }
  },
  methods: {
    multiplicar(){
    this.contador = this.retornar(this.contador);  
    verificar_limite(); 
    },
    retornar(a){
      return a*3;
    }
  }

});






