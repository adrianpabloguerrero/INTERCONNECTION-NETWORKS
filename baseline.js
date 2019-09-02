class Baseline {
	
	constructor (nroEtapa,espacioDeDirecciones) {
		this.nroEtapa = nroEtapa;
		this.espacioDeDirecciones = espacioDeDirecciones;
	}

	
	formatearDireccion (n) {
    var dir = n.toString(2);
     while (dir.length<this.espacioDeDirecciones)
       dir = '0'+dir;
     return dir;
   }

   	



	calcular (input)
	{
		console.log ("numero etapa " + this.nroEtapa);
		
        this.salida= [];
		//formateo de direccion
		this.var = this.formatearDireccion(input);
		this.arreglo = this.var.split('');

        //guardo valores
        
        this.ultimaPosicion = this.arreglo.length-1;
        this.i=this.ultimaPosicion - this.nroEtapa;
       
		console.log("valor de i: " + this.i);

        for (var j=0;j<this.i;j++)
            this.salida.push(this.arreglo[j]);
        this.salida.push(this.arreglo[this.ultimaPosicion]);
        for (var j=this.i+1;j<=this.ultimaPosicion;j++)
            this.salida.push(this.arreglo[j-1]);

        


		console.log ("Input: " + this.arreglo);
		console.log ("Output: " + this.salida.join(""));
		
		//this.output = this.arreglo;
		//this.output[this.arreglo.length-1-this.nroEtapa] =  
		//console.log(this.output);
		return this.salida.join("");
	}

}