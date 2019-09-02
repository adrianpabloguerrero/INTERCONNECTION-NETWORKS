        

        //comentarioCristian
        Vue.prototype.$eventBus = new Vue();



          Vue.component ('crossbar', {
            props: ['crossbar'],
            data: function() {
              return{
              }},
              template: `<div class="row crossbar" :style="crossbar.getConflicto() ? { 'background-color': 'red' } : crossbar.buffer.length==0 ? { 'background-color': '#f0e68c' } : { 'background-color': '#F8A842' } "> 
              <div class="col-1 list-puertos nopadding"> 
              <puerto  v-for="(po,index) in crossbar.entradas" v-bind:puerto=po v-bind:key="index">     </puerto>          
              </div>
              <div class="col-10  nopadding" style = "text-align:center; display: flex; flex-direction: column; justify-content: space-around; font-family: 'Montserrat', sans-serif; position: relative; color:black; font-size: 7px;"> {{ "Buffer: " + crossbar.buffer.length}} </div>
              <div class="col-1 list-puertos nopadding"> 
              <puerto  v-for="(po,index) in crossbar.salidas" v-bind:puerto=po v-bind:key="index">    </puerto>           
              </div>
              </div>`
            }),

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
           
              
            template:`<div class="rowProcesadores">
                 <inputsProcesadores v-bind:procesador=procesador style="z-index:20;"> </inputsProcesadores>
                      <div :id="procesador.getDireccion()" class="procesador" :style="procesador.getActivado() ? { 'background-color': '#6BBA12',  'color':'white' } : {'background-color' : '#d3d3d3'}"> 
                            <div style="margin:auto">
                            <div> {{"Procesador " + procesador.getDireccion()  }} </div>    
                            </div>
                            <div class="myrow">
                               <div class="col-11 nopadding"> </div>
                               <div class="col-1 list-puertos nopadding">  <puerto v-bind:puerto=procesador.puerto> </puerto>  </div>
                            </div> 
                      </div>

                      </div>`
            
          });

          Vue.component ('inputsProcesadores', {
            props: ['procesador'],
           data: function() {
            return {
            }},


           
            methods: {

            setModel: function (e) {
                this.procesador.getDestinos().push(this.procesador.getProximaDireccion());
                
            },  

            getDireccion (n,espacioDeDirecciones)   {
             var dir = n.toString(2);
             while (dir.length<espacioDeDirecciones)
               dir = '0'+dir;
             return dir;
            }

          },

            template:`<div style="display: flex; flex-direction:column; margin-top:20px; margin-right:10px"> 
                        <div class="row" >  
                        <div style="display: flex; align-items:center; justify-content:center">                
                          <label for="Activado">Activado</label><input type="checkbox"aria-label="Checkbox for following text input" style ="margin: 3px;" id="activado" v-model="procesador.activado">
                          <select class="custom-select" :disabled="!procesador.activado" v-model="procesador.periodicidad" style ="margin: 2px; width:75px;">
                                <option>Periodico</option>
                                <option>Unica vez</option>
                                <option>Al azar</option>
                            </select>
                            <input  :disabled="!procesador.getEsPeriodico()" type="text" v-model= "procesador.pasos" placeholder="Pasos" min="0" style="width:50px; margin: 3px;"></input>
                            <select :disabled="!procesador.activado" v-model="procesador.proximaDireccion" v-on:change="setModel" style ="margin: 5px; width:80px;">
                                <option disabled value="">Direcciones de memoria</option>
                                <option  v-for="direccion in procesador.destinosPosibles"> {{direccion}}</option>
                            </select>
                        </div>    
                        </div>
                        <div class="row">
                          <div style="display: flex; align-items:center; justify-content:left"> {{" Destinos: " + procesador.getDestinos()  }} </div>
                        </div>
                      </div>`            
          });





          Vue.component ('slotMemoria', {
            props: ['slotMemoria'],
            data: function(){
              return{
              }},
              template: `<div class="row slotMemoria" :style="slotMemoria.getPuerto().getOcupado() ? { 'background-color': '#6BBA12',  'color':'white' } : {'background-color' : '#d3d3d3'}"> 
                            <div class="col-1 list-puertos nopadding"> <puerto v-bind:puerto=slotMemoria.puerto> </puerto></div>
                            <div class="col-3  nopadding"> {{slotMemoria.getId()}}</div> 
                            <div class="col-8" v-if="slotMemoria.getPuerto().getMensaje()== null">  </div>
                            <div class="col-8" v-if="slotMemoria.getPuerto().getMensaje()!= null" style=" height: 30px; width:100%; text-align:center; display: flex; flex-direction: column; justify-content: space-around; padding-left: 0px; padding-right: 0px;"> {{slotMemoria.getPuerto().getMensaje().getContenido()}}</div>
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

              updated: function () {
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
              message: "Simulador de redes de interconexion",
              image: 'logo.png',
              nroproc: 0,
              longBuffer: 0,
              periodicidad: '',
              nroprocactivos: '',
              configuracion: '',
              procesadores: [],
              potencia:'',
              tipo: 'Omega',
              etapas: [],
              memoria: null,
              conexiones:null,
              perfectShuffle:null,
              baseline:null,
            },
              

              
            watch: {
              nroproc: function(){
               this.inicializar();
              

                },

                tipo:function(){

                  this.inicializar();
                },

                longBuffer:function(){
                  this.inicializar();
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

                inicializar () {
                this.procesadores=[];
                this.etapas=[];
                this.memoria=null;
                this.conexiones=null;
                if (this.nroproc>0){
                  this.conexiones = [];
                  for (var i = 0; i < this.nroproc; i++)
                    this.procesadores.push(new Procesador(i,this.nroEtapas));
                  for (var i = 0; i < this.nroEtapas; i++){
                      if (this.tipo == "Omega"){
                         this.etapas.push(new Etapa(i,this.nroEtapas,this.nroproc,new PerfectShuffle(2),this.longBuffer));
                       }
                      if (this.tipo == "Baseline"){
                        if (i==0)
                         this.etapas.push(new Etapa(i,this.nroEtapas,this.nroproc,new PerfectShuffle(2),this.longBuffer));
                       else 
                        this.etapas.push(new Etapa(i,this.nroEtapas,this.nroproc,new Baseline(this.nroEtapas-i,this.potencia),this.longBuffer));
                       }
                  }
                  this.memoria = new Memoria(this.nroEtapas);
                    this.crearConexionesExternas();
                }},
               
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
                 if (!this.hayConflicto()){
                    this.memoria.avanzar();
                    for (var i = this.etapas.length-1; i>=0; i--)
                      this.etapas[i].avanzar();
                     for (var i = this.procesadores.length-1; i>=0; i--)
                      this.procesadores[i].avanzar();
                  } else
                  console.log("hubo conflicto");
                },

                hayConflicto(){
                for (var i =0; i<this.nroEtapas; i++)
                  for (var j = 0; j < this.etapas[i].getCrossbars().length; j++)
                    if (this.etapas[i].getCrossbars()[j].getConflicto())
                      return true;
                return false;
              },

                reset(){
                  this.nroproc='';
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
          Simulador de redes de interconexi&#243;n
          <img class="image" v-bind:src="image" />  
        </div>
        <nav class="navbar nav-pills nav-fill" style="background-color: #e3f2fd;">
         <div class="nav-item"> 
          <label for="potencia">Numero de procesadores: 2^ </label>
          <input type="text" v-model= "potencia" placeholder="Exponente" min="0" style="width:100px"></input>
        </div>
        <div class="nav-item nav-link"> 
          <label for="longBuffer">Tama&ntilde;o del buffer: </label>
          <input type="text" v-model= "longBuffer" min="0" style="width:100px"></input>
        </div>
        <div class="nav-item nav-link " style="display:flex; flex-direction:row; vertical-align: center; align-items:center"> 
          <label>Tipo:  </label>
          <select class="custom-select" v-model="tipo">
                  <option>Omega</option>
                  <option>Baseline</option>
          </select>
        </div>
         <div class="nav-item">
          <a href="informe.pdf"  target=»_blank» > Informaci&#243;n </a>
        </div>
        <div class="nav-item">
          <a  href="http://arqui2.alumnos.exa.unicen.edu.ar/"  target=»_blank»> C&#225;tedra </a>
        </div>
        </nav> 
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
                    <label> Pasos de simulaci&#243;n:</label>
                    <button type="button" class="btn btn-primary btn-lg btn-block":disabled="hayConflicto()" v-on:click="this.avanzar">Paso siguiente</button> 
                    <button type="button" class="btn btn-primary btn-lg btn-block"  v-on:click="this.reset">Reset</button>
                </div> 
              
          </div> 
        
</div>`
//chequeo 2
            });



