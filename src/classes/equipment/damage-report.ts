
export class DamageReport {

	id: string;
	timestamp: string;
	title: string;
	imageFiles: any;
	audios: any;
	author: string;

	constructor(){
		this.setDefaultValues();
	}
	//PUBLIC 
	setData(data){ //{{{
	} // }}}
	getId(){
		return this.id;
	}

	//PRIVATE
	private setDefaultValues(){// {{{
		this.id = "";
		let d = new Date();
		this.timestamp = d.toISOString();
		this.title = "";
		this.author = "";
		this.imageFiles = [];
		this.audios = [];
	}// }}}
}


