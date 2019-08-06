 class Procesador {

	constructor (id,espacioDeDirecciones){
		this.id=id;
		this.espacioDeDirecciones = espacioDeDirecciones;
	}

	getDireccion  ()   {
  	 var dir = this.id.toString(2);
  	 while (dir.length<this.espacioDeDirecciones)
    	 dir = '0'+dir;
     return dir;
   }

   getId () {
   	return this.id;
   }

  
};

