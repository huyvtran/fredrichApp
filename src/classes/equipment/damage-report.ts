
export class DamageReport {

	id: string;
	timestamp: Date;
	title: string;
	imageFiles: any;
	audioFiles: any;
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

	getTimestamp(){
		return this.timestamp.toISOString();
	}

	//PRIVATE
	private setDefaultValues(){// {{{
		this.id = "";
		this.timestamp = new Date();
		this.title = "";
		this.author = "";
		this.imageFiles = [];
		this.audioFiles = [];
	}// }}}
}


