 class Procesador {

	constructor (id,espacioDeDirecciones){
		this.id=id;
		this.espacioDeDirecciones = espacioDeDirecciones;
    this.puerto = new Puerto(this.getId() + "p");
    this.activado = false;
	}

  avanzar (){
    if (this.activado){
    if (Math.random()>0.8){
      this.puerto.setMensaje(new Mensaje (1,"100"," Soy el procesador " + this.id.toString(2)));
      }
    }
  }

  setActivado (activado){
    this.activado=activado;
  }

  getActivado(){
    return this.activado;
  }
	getDireccion  ()   {
  	 var dir = this.id.toString(2);
  	 while (dir.length<this.espacioDeDirecciones)
    	 dir = '0'+dir;
     return dir;
   }

   getId   () {
   	return this.id;
   }

   getPuerto () {
    return this.puerto;
   }

  
};

