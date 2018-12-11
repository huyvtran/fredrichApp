
export class ConstructionsiteEvent {

	id: string;
	type: any;
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
		this.title = "";
		this.description = "";
		this.author = "";
		this.imageFiles = [];
	}

	isValid(){
		return (this.id != "-1")
			&& (this.type.length>0)
			&& (this.title.length > 0)
			&& (this.description.length > 0)
			&& (this.author.length > 0);
	}

}
