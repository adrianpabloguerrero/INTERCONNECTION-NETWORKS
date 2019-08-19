class Memoria {

	constructor (nroEtapas){
		this.slots= [];
		for (var i=0; i<Math.pow(2,nroEtapas);i++)
			this.slots.push(new SlotMemoria (i,nroEtapas))
		this.activo=true;

	}

	getSlots(){
		return this.slots;
	}

	getActivo (){
		return this.activo;
	}

	avanzar (){
		this.slots.forEach(function(element) {
  			element.avanzar();
		});
	}

	


};
