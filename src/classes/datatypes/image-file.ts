import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

export class ImageFile {

	private id: string;
	private path: string;
	private fileName: string;
	private base64Path: string;
	private timestamp: Date;
	private file: File;
	private platform: Platform;

	constructor(data?: any){
		this.setDefaults();
		if(data){
			this.setFieldsFromData(data);
		} 
	}

	private setFieldsFromData(data: any){// {{{
		this.id = data.id;
		this.path = data.path;
		this.fileName = data.fileName;
		this.base64Path = data.base64Path;
// 		this.setBase64Path();
	}// }}}
	private setDefaults(){// {{{
		this.id = "-1";
		this.path = "";
		this.fileName = "";
		this.base64Path = "";
		this.timestamp = new Date();
		this.platform = new Platform();

		this.file = new File();
	}// }}}
	echo(){
		console.log("IMAGE ECHO:");
		console.log("ID: " + this.id);
		console.log("PATH: " + this.path);
		console.log("FILENAME: " + this.fileName);
		console.log("BASE64PATH: " + this.base64Path);
		console.log("TIMESTAMP: " + this.timestamp.toLocaleString());
	}
	//GETTERS
	getId(){// {{{
		return this.id;
	}// }}}
	getBase64Path(){// {{{
		let retval = "";
		if(this.path.startsWith('assets')){
			retval = this.path + this.fileName;
		} else {
			retval = this.base64Path;
		}
// 		console.log("BASE64PATH RETVAL: " + retval);
		return retval;
	}// }}}
	//SETTERS
	setId(id){// {{{
		this.id=id;
	}// }}}

// 	//TEST
	setBase64Path(){// {{{
		const promise = new Promise((resolve, reject) => {
			this.file.readAsDataURL(this.path, this.fileName)
				.then(imagePathBase64 => {
					this.base64Path = imagePathBase64;
					resolve(true);
				})
				.catch(err => {
					reject(err);
				});
		});
		return promise;
	}// }}}
}

