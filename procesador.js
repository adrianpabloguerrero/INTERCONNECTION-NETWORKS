 class Procesador {

	constructor (id,espacioDeDirecciones){
		this.id=id;
		this.espacioDeDirecciones = espacioDeDirecciones;
    this.puerto = new Puerto(this.getId() + "p");
    this.activado = false;
    this.destinos= [];
    this.periodicidad = 0;
    this.pasos=0;
	}

  avanzar (){
    if (this.activado){
      if (this.periodicidad == "Unica vez"){  
           this.puerto.setMensaje(new Mensaje (1,"100"," Soy el procesador " + this.id.toString(2))); 
           this.activado=false; 
      }
       if (this.periodicidad == "Al azar"){
          if (Math.random() > 0.5)  
           this.puerto.setMensaje(new Mensaje (1,"100"," Soy el procesador " + this.id.toString(2))); 
      }
    }
  }

  setPerioricidad (periodicidad){
    this.periodicidad=periodicidad;
  }

  getPerioricidad(){
    return this.periodicidad;
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

