 class Procesador {

	constructor (id,espacioDeDirecciones){
		this.id=id;
		this.espacioDeDirecciones = espacioDeDirecciones;
    this.puerto = new Puerto(this.getId() + "p");
    this.activado = false;
    this.destinos= [];
    this.periodicidad = 0;
    this.pasos=0;
    this.pasoActual = 1;
    this.destinosPosibles = [];
    this.proximaDireccion = 0;
    this.posicionLista = 0;
    for (var i=0; i<Math.pow(2,espacioDeDirecciones); i++)
      this.destinosPosibles.push(this.formatearDireccion(i));
	}

  avanzar (){
    if (this.activado){

      if (this.periodicidad == "Unica vez"){  
           this.puerto.setMensaje(new Mensaje (1,this.destinos[this.posicionLista],"Msj procesador " + this.id.toString(2))); 
            if (this.posicionLista == this.destinos.length-1)
                this.activado=false; 
      }
       if (this.periodicidad == "Al azar"){
          if (Math.random() > 0.5)  
           this.puerto.setMensaje(new Mensaje (1,this.destinos[this.posicionLista],"Msj procesador " + this.id.toString(2))); 
      }
      if (this.periodicidad == "Periodico"){
        if (this.pasoActual==this.pasos){
            this.puerto.setMensaje(new Mensaje (1,this.destinos[this.posicionLista],"Msj procesador " + this.id.toString(2)));
            this.pasoActual=1;
          } else 
          this.pasoActual++;
        } 

console.log (this.destinos.length);

      if (this.posicionLista < this.destinos.length-1)
        this.posicionLista ++;
      else 
        this.posicionLista = 0;
      }


  }


  getProximaDireccion(){
    return this.proximaDireccion;
  }

  getDestinos(){
    return this.destinos;
  }
  getDestinosPosibles(){
    return this.destinosPosibles;
  }

  getEsPeriodico(){
    return (this.periodicidad=="Periodico");
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

   formatearDireccion (n) {
     var dir = n.toString(2);
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

