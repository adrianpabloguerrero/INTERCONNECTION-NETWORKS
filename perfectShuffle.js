class PerfectShuffle {
	
	constructor (k) {
		this.k=k;
	}

	 bin2dec(bin) {
    return parseInt(bin, 2).toString(10);
	}

	calcular (input,processors)
	{
		return (((parseInt (input,2)*this.k)+ Math.trunc((parseInt (input,2)*this.k)/processors))%processors).toString(2);
	}

}