class Crossbar {

	constructor (id){
		this.id=id;
		this.entrada1=false;
		this.entrada2=false;
		this.salida1=false;
		this.salida2=false;
	}

	getOcupado  ()   {
     return (this.entrada1||this.entrada2||this.salida1||this.salida2);
   }


};

