
class Etapa {

	constructor (id,nroEtapas,nroproc){
		this.id=id;
		this.crossbar = [];
		this.cantidad = this.getCantidad(nroEtapas);
		this.entradas = [];
		this.salidas = [];
		for (var i=0; i<this.cantidad;i++)
			this.crossbar.push(new Crossbar(i));
		for (var i = 0; i< nroproc; i ++) {
			this.entradas.push(new Puerto(this.getId() + "e" + i.toString(2)));
			this.salidas.push(new Puerto(this.getId() + "s" + i.toString(2)));
		}
	}

	getCantidad (nro){
		console.log (nro);
		var exponente = nro-1; 
		return Math.pow(2,exponente); 
	}

	getId () {
		return this.id;
	}


	getEntradas (){
		return this.entradas;
	}

	getSalidas (){
		return this.salidas;
	}

}