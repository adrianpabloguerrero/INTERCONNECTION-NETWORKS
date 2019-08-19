class Mensaje {
	
	constructor (id,destino,contenido) {
		this.id = id;
		this.contenido = contenido;
		this.destino = destino;
	}

	setContenido (contenido){
		this.contenido = contenido;
	}

	getContenido (){
		return this.contenido;
	}

	setDestino (destino){
		this.destino = destino;
	}

	getDestino (){
		return this.destino;
	}

	getId(){
		return this.id;
	}


} 