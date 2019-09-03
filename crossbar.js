class Crossbar {

	constructor (id,longBuffer){
		this.id=id;
		this.entradas=[];
		this.salidas=[];
		this.conexion = null;
		for (var i = 0; i< 2; i ++) {
			this.entradas.push(new Puerto(this.getId() + "ec" + i.toString(2)));
			this.salidas.push(new Puerto(this.getId() + "sc" + i.toString(2)));
		}
		this.buffer=[];
		this.puertoBuffer = (new Puerto (this.getId() + "b" + i.toString(2)));
		this.longBuffer= longBuffer;
	}

	avanzar (){
		//Si tengo algo en el buffer, saco lo del buffer y coloco lo que tenian las entradas en el buffer.
		if (this.buffer.length > 0){
			this.puertoBuffer.setMensaje(this.buffer[0]);
			this.buffer.shift();
			this.conexion = new Conexion (this.puertoBuffer,this.salidas[this.calcularSalida(this.puertoBuffer.getMensaje())]);
			this.conexion.traerMensaje();
			for (var i=0; i<this.entradas.length;i++)
				if (this.entradas[i].getOcupado()){
					this.buffer.push(this.entradas[i].getMensaje());
					this.entradas[i].setMensaje(null);
				}
		} else{
			//sale el de arriba y el de abajo va al buffer
			if (this.entradas[0].getOcupado() && this.entradas[1].getOcupado())	{
				this.buffer.push(this.entradas[1].getMensaje());
				this.entradas[1].setMensaje(null);
				this.conexion = new Conexion (this.entradas[0],this.salidas[this.calcularSalida(this.entradas[0].getMensaje())]);
				
				this.conexion.traerMensaje();
			} else {
				//deberia haber solo uno ocupado y el buffer vacio
				for (var i=0; i<this.entradas.length;i++) {
					if (this.entradas[i].getOcupado()) {
						this.conexion = new Conexion (this.entradas[i],this.salidas[this.calcularSalida(this.entradas[i].getMensaje())]);
						this.conexion.traerMensaje();
					}
				}
			}
		 }

		for (var i=0; i<this.entradas.length;i++)
			this.entradas[i].traerMensaje();
					
	}

	getBuffer (){
		return this.buffer;
	}

	calcularSalida(mensaje){
		var destino = mensaje.getDestino();
		mensaje.setDestino(destino.substr(1,destino.length));
		return destino.substr(0,1);
	}

	getConflicto (){
		return (this.buffer.length>this.longBuffer);
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

