
export class DamageReport {

	id: string;
	type: any;
	item: any;
	title: string;
	description: string;
	author: string;
	imageFiles: any;

	constructor(){
		this.setDefaults();
	}
	setDefaults(){
		this.id = "-1";
		this.type = [];
		this.item = null;
		this.title = "";
		this.description = "";
		this.author = "";
		this.imageFiles = [];
	}

}
