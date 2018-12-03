
export class ConstructionsiteEvent {

	type: any;
	title: string;
	description: string;
	author: string;
	imageFiles: any;

	constructor(){
		this.setDefaults();
	}
	setDefaults(){
		this.type = [];
		this.title = "";
		this.description = "";
		this.author = "";
		this.imageFiles = [];
	}

	isValid(){
		return (this.type.length>0)
			&& (this.title.length > 0)
			&& (this.description.length > 0)
			&& (this.author.length > 0);
	}

}
