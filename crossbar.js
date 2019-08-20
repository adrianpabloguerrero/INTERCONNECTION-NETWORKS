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
		for (var i=0; i<this.entradas.length;i++)
			if (this.entradas[i].getOcupado()){
				this.conexion = new Conexion (this.entradas[i],this.salidas[this.calcularSalida(this.entradas[i].getMensaje())]);
				this.conexion.traerMensaje();
			}
		for (var i=0; i<this.entradas.length;i++)
			this.entradas[i].traerMensaje();
	}


	calcularSalida(mensaje){
		var destino = mensaje.getDestino();
		mensaje.setDestino(destino.substr(1,destino.length));
		return destino.substr(0,1);
	}

	getConflicto (){
		return (this.entradas[0].getOcupado() && this.entradas[1].getOcupado());
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

