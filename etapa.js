
class Etapa {

	constructor (id,nroEtapas,nroproc,calculador){
		this.id=id;
		this.crossbar = [];
		this.cantidad = this.getCantidad(nroEtapas);
		this.entradas = [];
		this.salidas = [];
		this.conexiones=[];
		this.calculador=calculador;
		this.nroproc = nroproc;
		for (var i=0; i<this.cantidad;i++)
			this.crossbar.push(new Crossbar(i));
		for (var i = 0; i< this.nroproc; i ++) {
			this.entradas.push(new Puerto(this.getId() + "e" + i.toString(2)));
			this.salidas.push(new Puerto(this.getId() + "s" + i.toString(2)));
		}
		this.crearConexiones();
	}


	crearConexiones (){
		for (var i = 0; i<this.nroproc; i ++) {
			this.conexiones.push(new Conexion (this.entradas[i],this.salidas[this.bin2dec(this.calculador.calcular(i.toString(2),this.nroproc))]));		
		}
	}


	bin2dec(bin) {
    return parseInt(bin, 2).toString(10);
	}

	getCantidad (nro){
		var exponente = nro-1; 
		return Math.pow(2,exponente); 
	}

	getId () {
		return this.id;
	}

	getConexiones(){
		return this.conexiones;
	}

	getEntradas (){
		return this.entradas;
	}

	getSalidas (){
		return this.salidas;
	}

}