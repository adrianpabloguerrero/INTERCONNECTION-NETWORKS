class Crossbar {

	constructor (id){
		this.id=id;
		this.entradas=[];
		this.salidas=[];
		this.conexion = null;
		for (var i = 0; i< 2; i ++) {
			this.entradas.push(new Puerto(this.getId() + "ec" + i.toString(2)));
			this.salidas.push(new Puerto(this.getId() + "sc" + i.toString(2)));
		}
	}

	avanzar (){
		//por el momento salen todas por arriba
		for (var i=0; i<this.entradas.length;i++)
			if (this.entradas[i].getOcupado()){
				console.log("guacho");
				this.conexion = new Conexion (this.entradas[i],this.salidas[0]);
				this.conexion.traerMensaje();
			}
		for (var i=0; i<this.entradas.length;i++)
			this.entradas[i].traerMensaje();

	}

	getOcupado  ()   {
     return (this.conexion!=null);
   }

   getEntradas(){
   	return this.entradas;
   }

   getSalidas(){
   	return this.salidas;
   }

   
   getId(){
   	return this.id;
   }


};

