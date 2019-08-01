
class Etapa {

	constructor (id,nroEtapas){
		this.id=id;
		this.crossbar = [];
		this.cantidad = this.getCantidad(nroEtapas);
		for (var i=0; i<this.cantidad;i++)
			this.crossbar.push(new Crossbar(i));
	}

	getCantidad (nro){
		console.log (nro);
		var exponente = nro-1; 
		return Math.pow(2,exponente); 
	}

	getId () {
		return this.id;
	}

	


}