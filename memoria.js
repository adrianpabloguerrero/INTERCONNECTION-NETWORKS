class Memoria {

	constructor (nroEtapas){
		this.slots= [];
		for (var i=0; i<Math.pow(2,nroEtapas);i++)
			this.slots.push(new SlotMemoria (i,nroEtapas))

	}

	getSlots(){
		return this.slots;
	}

	


};
