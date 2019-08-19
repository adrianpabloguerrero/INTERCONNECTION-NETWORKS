 class SlotMemoria {

	constructor (id,nroEtapas){
		this.id=id;
		this.nroEtapas = nroEtapas;
    this.puerto = new Puerto (this.getId() + "m");
    this.mensaje = 0;
	}
	
   getId() {
   	 var dir = this.id.toString(2);
  	 while (dir.length<this.nroEtapas)
    	 dir = '0'+dir;
     return dir;
   }


   getMensaje (){
    return this.mensaje;
   }

   getPuerto(){
    return this.puerto;
   }

   avanzar (){
    this.puerto.traerMensaje();
    if (this.puerto.getOcupado()){
      this.mensaje = this.puerto.getMensaje().getContenido();
    }
   }
};
