class Crossbar {

	constructor (id){
		this.id=id;
		this.entrada1=false;
		this.entrada2=false;
		this.salida1=false;
		this.salida2=false;
		this.entradas=[];
		this.salidas=[];
		for (var i = 0; i< 2; i ++) {
			this.entradas.push(new Puerto(this.getId() + "ec" + i.toString(2)));
			this.salidas.push(new Puerto(this.getId() + "sc" + i.toString(2)));
		}
	}

	getOcupado  ()   {
     return (this.entrada1||this.entrada2||this.salida1||this.salida2);
   }

   getEntradas(){
   	return this.entradas;
   }

   getSalidas(){
   	return this.salidas;
   }

   
   getId(){
   	return this.id;
   }


};

