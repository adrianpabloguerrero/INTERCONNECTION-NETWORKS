class Puerto {
	
	constructor (id) {
		this.id=id;
		this.ocupado=false;
		this.mensaje = null;
		this.conexionOrigen = null;
		this.conexionDestino = null;
	}

	getId(){
		return this.id;
	}

	traerMensaje(){
		this.conexionOrigen.traerMensaje();
	}

	setConexionOrigen (conexionOrigen){
		this.conexionOrigen = conexionOrigen;
	}

	setConexionDestino (conexionDestino){
		this.conexionDestino = conexionDestino;
	}

	getConexionOrigen(){
		return this.conexionOrigen;
	}

	getConexionDestino(){
		return this.conexionDestino;
	}

	setMensaje (mensaje) {
		this.mensaje=mensaje;
	}

	getMensaje () {
		return this.mensaje;
	}

	getOcupado (){
		return (this.mensaje!=null);
	}

	getIdBinario (separador){
		this.var = this.id.split(separador);
		return this.var[1];
	}

}