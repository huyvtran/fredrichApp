
export class DamageReport {

	id: string;
	timestamp: Date;
	title: string;
	imageFiles: any;
	audioFiles: any;
	author: string;
	isUploaded: boolean;
	parentItemId: string;

	constructor(){
		this.setDefaultValues();
	}
	//PUBLIC 
	setData(data){ //{{{
	} // }}}
	getId(){// {{{
		return this.id;
	}// }}}
	getTimestamp(){// {{{
		return this.timestamp.toISOString();
	}// }}}
	getTimestampLocal(){// {{{
		return this.timestamp.toLocaleString();
	}// }}}
	getImageFiles(){// {{{
		return this.imageFiles;
	}// }}}
	getNumImageFiles(){// {{{
		return this.imageFiles.length;
	}// }}}
	getAudioFiles(){// {{{
		return this.audioFiles;
	}// }}}
	getNumAudioFiles(){// {{{
		return this.audioFiles.length;
	}// }}}
	getParentItem(){
		// 		return this.equipmentProvider.getItemById(this.parentItemId); //TODO: refactor with
		// 		new equipmentprovider
	}

	//PRIVATE
	private setDefaultValues(){// {{{
		this.id = "";
		this.timestamp = new Date();
		this.title = "";
		this.author = "";
		this.imageFiles = [];
		this.audioFiles = [];
		this.isUploaded = false;
	}// }}}
}


