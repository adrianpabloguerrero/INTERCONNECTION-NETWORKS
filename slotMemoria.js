 class SlotMemoria {

	constructor (id,nroEtapas){
		this.id=id;
		this.nroEtapas = nroEtapas;
	}

	
   getId () {
   	 var dir = this.id.toString(2);
  	 while (dir.length<this.nroEtapas)
    	 dir = '0'+dir;
     return dir;
   }

};
