      //comentarioCristian
      Vue.prototype.$eventBus = new Vue();

        Vue.component ('crossbar', {
          props: ['crossbar'],
          data: function() {
            return{
            }},
            template: `<div class="row crossbar" :style="crossbar.getConflicto() ? { 'background-color': 'red' } : { 'background-color': 'yellow' }"> 
            <div class="col-1 list-puertos nopadding"> 
            <puerto  v-for="(po,index) in crossbar.entradas" v-bind:puerto=po v-bind:key="index">     </puerto>          
            </div>
            <div class="col-10  nopadding"> </div>
            <div class="col-1 list-puertos nopadding"> 
            <puerto  v-for="(po,index) in crossbar.salidas" v-bind:puerto=po v-bind:key="index">    </puerto>           
            </div>
            </div>`
          })

        Vue.component('conexion',{
          props:['conexion'],
          data: function(){
            return{
              elemOrigen: null,
              elemDestino: null,
              origen: null,
              destino: null,
              origenCirculoX: null,
              origenCirculoY: null,
              destinoCirculoX: null,
              destinoCirculoY: null,
              description: null
            }},


            created() {
              window.addEventListener('resize',this.cambioTamano);
              this.cambioTamano();
              this.$eventBus.$on('send-data', (data) => {
                 this.prepare();
              })},

              destroyed() {
              window.removeEventListener('resize',this.cambioTamano);
            },
            
          

            methods: {


              calcularDescription (){
                this.description= " M " + this.origen + " L " + this.destino;
              },
              calcularOrigen(){
                if (this.elemOrigen==null){
                  this.origen= " ";
                  this.origenCirculoX= 0;
                  this.origenCirculoY= 0;
                }
                else{
                this.origen= (this.elemOrigen.getBoundingClientRect().left + ((this.elemOrigen.getBoundingClientRect().width)/2) - this.$el.getBoundingClientRect().left) + " " + (this.elemOrigen.getBoundingClientRect().top + ((this.elemOrigen.getBoundingClientRect().height)/2) - this.$el.getBoundingClientRect().top);
                this.origenCirculoX = (this.elemOrigen.getBoundingClientRect().left + ((this.elemOrigen.getBoundingClientRect().width)/2) - this.$el.getBoundingClientRect().left);
                this.origenCirculoY = (this.elemOrigen.getBoundingClientRect().top + ((this.elemOrigen.getBoundingClientRect().height)/2) - this.$el.getBoundingClientRect().top);
              }},

              calcularDestino(){
                 if (this.elemDestino==null){
                  this.destino = " ";
                  this.destinoCirculoX= 0;
                  this.destinoCirculoY= 0;
                }
                else{
                this.destino = (this.elemDestino.getBoundingClientRect().left + ((this.elemDestino.getBoundingClientRect().width)/2)- this.$el.getBoundingClientRect().left)+ " " + (this.elemDestino.getBoundingClientRect().top + ((this.elemDestino.getBoundingClientRect().height)/2) - this.$el.getBoundingClientRect().top);
                this.destinoCirculoX = (this.elemDestino.getBoundingClientRect().left + ((this.elemDestino.getBoundingClientRect().width)/2)- this.$el.getBoundingClientRect().left);
                this.destinoCirculoY = (this.elemDestino.getBoundingClientRect().top + ((this.elemDestino.getBoundingClientRect().height)/2) - this.$el.getBoundingClientRect().top);
              }},

              cambioTamano(){
                this.calcularOrigen();
                this.calcularDestino();
                this.calcularDescription();
              },

              prepare: function() {
                this.elemOrigen = document.getElementById(this.conexion.getEntrada().getId());
                this.elemDestino = document.getElementById(this.conexion.getSalida().getId());
                this.calcularOrigen();
                this.calcularDestino();
                this.calcularDescription();
            }},
            template: `<svg style="position:absolute;top:0;left:0;width:100%;height:100%" viewbox="0 0 100 100">
                                 <path v-if="elemOrigen!=null" :style="conexion.getOcupada() ? { 'stroke': 'green' } : { 'stroke': 'red' }" stroke-width="3" :d="this.description"> </path>
                      </svg>`
          })

           Vue.component ('procesador', {
         props: ['procesador'],
         data: function() {
          return {
          }},

            
          template: `<div :id="procesador.getDireccion()" class="procesador"> 
                          <div> {{"Procesador " + procesador.getDireccion() }} </div>  
                          <div class="myrow">
                             <div class="col-11 nopadding"> </div>
                             <div class="col-1 list-puertos nopadding">  <puerto v-bind:puerto=procesador.puerto> </puerto>  </div>
                          </div> 
                    </div>`
        });

        Vue.component ('slotMemoria', {
          props: ['slotMemoria'],
          data: function(){
            return{
            }},
            template: `<div class="row slotMemoria"> 
                          <div class="col-1 list-puertos nopadding"> <puerto v-bind:puerto=slotMemoria.puerto> </puerto></div>
                          <div class="col-11  nopadding"> {{slotMemoria.getId() + slotMemoria.getMensaje() }}  </div> 
                       </div>`
          })

        Vue.component ('memoria', {
          props: ['memoria'],
          data: function(){
            return{
            }},
            template: '<div class="memoria">  {{"Memoria"}} <slotMemoria v-for="(so,index) in memoria.slots" v-bind:slotMemoria=so v-bind:key="index"> </slotMemoria> </div>'
                    })



        Vue.component ('etapa', {
          props: ['etapa'],
          data: function() {
            return{
            }},

            mounted: function () {
              this.$nextTick(function () {  
                  this.$eventBus.$emit('send-data', "montado");
              })
            },

            template: `<div class="row" style="height:100%;"> 
            <div class="col-8   etapa"> {{"Etapa " + etapa.getId()}} 
            <div class="row" style="height:100%;"> 
            <div class="col-1 list-puertos nopadding"> 
            <puerto  v-for="(po,index) in etapa.entradas" v-bind:puerto=po v-bind:key="index">  </puerto> 
            </div>
            <div class="col-10  nopadding">               
            </div>
            <div class="col-1 list-puertos nopadding"> 
            <puerto  v-for="(po,index) in etapa.salidas" v-bind:puerto=po v-bind:key="index">  </puerto>            
            </div>

            </div>
            </div>
            <div class="col-4 list-cross"> 
            <crossbar v-for="(co,index) in etapa.crossbar" v-bind:crossbar=co v-bind:key="index"> </crossbar> 
            </div> 
            <conexion v-for="(con,index) in etapa.conexiones" v-bind:conexion=con v-bind:key="index"> </conexion>
            </div>`
          })


        Vue.component ('puerto', {
          props: ['puerto'],
          data: function () {
            return{
            }},
            template: `<div :id="puerto.getId()" v-bind:class="{'puertoLibre':!puerto.getOcupado(), 'puertoOcupado':puerto.getOcupado()}"> </div>`
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
            potencia:'',
            etapas: [],
            memoria: null,
            conexiones:null,
            perfectShuffle:null,
            butterFlyZero:null,
          },
            
            
          watch: {
            nroproc: function(){
              this.procesadores=[];
              this.etapas=[];
              this.memoria=null;
              this.conexiones=null;
              if (this.nroproc>0){
                this.conexiones = [];
                for (var i = 0; i < this.nroproc; i++)
                  this.procesadores.push(new Procesador(i,this.nroEtapas));
                for (var i = 0; i < this.nroEtapas; i++){
                    this.etapas.push(new Etapa(i,this.nroEtapas,this.nroproc,new PerfectShuffle(2)));
                 
                }
                this.memoria = new Memoria(this.nroEtapas);
                  this.crearConexionesExternas();
            }

            


              },
              potencia: function(){
                if(this.potencia > 0)
                  this.nroproc = Math.pow(2,this.potencia);
                else
                    this.nroproc = 0;
            }
          },
        

        updated: function(){
            },


        


            computed: {
              nroEtapas: function (){
                return Math.ceil(Math.log(this.nroproc)/Math.log(2)) ;
              }
            },

            methods: {
             
              crearConexionesExternas (){
                for (var i = 0; i<this.nroproc; i++){
                  //conexiones logicas entre puerto de procesador y primer puerto de entrada
                  this.conexiones.push(new Conexion (this.procesadores[i].getPuerto(),this.etapas[0].getEntradas()[i]));
                }

                //conexiones entre ultimo crossbar y slotsMemoria
               var k=0;
                for (var i = 0; i<this.nroproc/2; i++){
                  for (var j=0; j<=1; j++){
                    this.conexiones.push(new Conexion (this.etapas[this.nroEtapas-1].getCrossbars()[i].getSalidas()[j],this.memoria.getSlots()[k].getPuerto()));
                    k++;
                  }
                }

                //conexiones entre salida etapa y crossbar
                for (var i=0; i<this.nroEtapas;i++)
                  for (var j=0; j<this.nroproc;j++)
                      this.conexiones.push(new Conexion (this.etapas[i].getSalidas()[j],this.etapas[i].getCrossbars()[Math.trunc(j/2)].getEntradas()[j%2]));
                
                //conexiones entre salida de crossbar y proxima etapa
                for (var i=0; i<this.nroEtapas-1;i++)
                  for (var j=0; j<this.nroproc;j++)
                      this.conexiones.push(new Conexion (this.etapas[i].getCrossbars()[Math.trunc(j/2)].getSalidas()[j%2],this.etapas[i+1].getEntradas()[j]));
              },

              avanzar (){
              this.memoria.avanzar();
              for (var i = this.etapas.length-1; i>=0; i--)
                this.etapas[i].avanzar();
               for (var i = this.procesadores.length-1; i>=0; i--)
                this.procesadores[i].avanzar();
              },

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
              <label for="potencia">Numero de procesadores:</label>
              <input type="text" v-model= "potencia" placeholder="Potencia de 2" min="0" style="width:100px"></input>
              <label for="nroproc">Procesadores activos:</label>
              <input type="number" v-model= "nroprocactivos" placeholder="Multiplo de 2" step="2" min="0" style="width:100px"></input>
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
              <div class="row">
                <div class="my-col">      
                  <procesador v-for= "(po,index) in procesadores" v-bind:procesador=po v-bind:key="index"> </procesador>
                </div>
                <div v-for= "(eo,index) in etapas" class="col my-col">
                  <etapa v-bind:etapa=eo v-bind:key="index"> </etapa>
                </div>
                <div class="col my-col">
                  <memoria v-if="memoria!== null" v-bind:memoria=memoria></memoria>
                </div>
                <conexion v-if="procesadores!==null" v-for="(co,index) in conexiones" v-bind:conexion=co v-bind:key="index"> </conexion>
              </div>
              <div class ="pasos">
              <label> Pasos de simulacion:</label>
              <button v-on:click="this.avanzar">Paso siguiente</button> 
              <button v-on:click>Paso anterior</button>
            </div> 
              
              <div>  
              </div>  
            </div>
          </div>`

          });



