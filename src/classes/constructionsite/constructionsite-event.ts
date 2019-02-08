import { ImageFile } from '../datatypes/image-file';

export class ConstructionsiteEvent {

	//TODO: set all to private
	id: string;
	type: any;
	title: string;
	description: string;
	author: string;
	private imageFiles: any;

	constructor(){
		this.setDefaults();
	}
	
	setDefaults(){// {{{
		this.id = "-1";
		this.type = [];
		this.title = "";
		this.description = "";
		this.author = "";
		this.imageFiles = [];
	}// }}}
	isValid(){// {{{
		return (this.id != "-1")
			&& (this.type.length>0)
			&& (this.title.length > 0)
			&& (this.description.length > 0)
			&& (this.author.length > 0);
	}// }}}
	addImageFile(image: ImageFile){
		console.log("ADDING IMAGE TO EVENT:");
		image.echo();
		this.imageFiles.push(image);
	}
	deleteImageFile(image: ImageFile){
		for (let i=0; i<this.getNumImageFiles(); i++){
			if(this.imageFiles[i].getId() == image.getId()){
				this.imageFiles.splice(i,1);
				//TODO REMOVE image from disk
				break;
			}
		}

	}
	//GETTERS
	getId(){// {{{
		return this.id;
	}// }}}
	getAvailableEventTypes(){// {{{
		let eventTypes = ["planChange","visit", "cAG", "extraService", "handicap", "hourlyWageWork", "shipping", "other"];
		return eventTypes;
	}// }}}
	getEventTypeString(eventType?:string){// {{{
		if(eventType){
			//do nothing
		} else {
			eventType = this.type;
		}
		let eventTypeStr="";
		switch (eventType){
			case "planChange": {
				eventTypeStr="Planaenderung";
				break;
			}
			case "visit": {
				eventTypeStr="Besuch";
				break;
			}
			case "cAG": {
				eventTypeStr="Anordnung des AG";
				break;
			}
			case "extraService": {
				eventTypeStr="Zusaetzliche Leistungen";
				break;
			}
			case "handicap": {
				eventTypeStr="Behinderung";
				break;
			}
			case "hourlyWageWork": {
				eventTypeStr="Stundenlohnarbeiten";
				break;
			}
			case "shipping": {
				eventTypeStr="Versand";
				break;
			}
			case "other": {
				eventTypeStr="Sonstige";
				break;
			}
			default: {
				console.log("UNKOWN TYPE STRING: " + eventType);
			break;
			}
		}
		return eventTypeStr;
	}// }}}
	getNumImageFiles(){
		return this.imageFiles.length;
	}
	getImageFiles(){
		return this.imageFiles;
	}
	//SETTERS
	setId(id){// {{{
		this.id=id;
	}// }}}
}

