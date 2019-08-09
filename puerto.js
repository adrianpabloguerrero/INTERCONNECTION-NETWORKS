class Puerto {
	
	constructor (id) {
		this.id=id;
		this.ocupado=false;
	}

	getId(){
		return this.id;
	}

	getIdBinario (separador){
		this.var = this.id.split(separador);
		return this.var[1];
	}

}