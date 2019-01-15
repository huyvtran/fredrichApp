import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';


declare var cordova: any; // global variable for paths

/*
  Generated class for the FileHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileHandlerProvider {

	baseDirPath: string;
	projDirPath: string;

  constructor(public http: HttpClient, public file: File) {
    console.log('Hello FileHandlerProvider Provider');
	  this.baseDirPath = '';
	  this.projDirPath = '';
  }

	public copyFileToProjDir(path, fileName, newFileName){// {{{
		var newPath = this.getProjDirPath();
		console.log("ATTEMPT TO COPY: " + path + fileName + " TO: " + newPath + newFileName);
		const promise = new Promise((resolve, reject) => {
			this.file.copyFile(path, fileName, newPath, newFileName)
				.then(res => {
					console.log("COPY: SUCCESS");
					console.log(JSON.stringify(res));
					resolve(res);
				})
				.catch(err => {
					console.log("COPY: FAIL");
					console.log(JSON.stringify(err));
					reject(err);
				});
		});
		return promise;
	}// }}}
	
// 	public copyFileToProjDir(path, fileName, newFileName){// {{{
// 		console.log("ATTEMPT TO COPY: " + path + fileName + " TO: " + this.getProjDirPath() + newFileName);
// 		this.file.copyFile(path, fileName, this.getProjDirPath(), newFileName)
// 			.then(res => {
// 				console.log("COPY: SUCCESS");
// 				console.log(JSON.stringify(res));
// 			})
// 			.catch(err => {
// 				console.log("COPY: FAIL");
// 				console.log(JSON.stringify(err));
// 			});
// 	}// }}}

	public configure(subDirName){// {{{
		this.setBaseDirPath();
		this.setProjDirPath(subDirName);
		this.checkProjDir();
	}// }}}
	getProjDirPath(){// {{{
		return this.projDirPath;
	}// }}}
	getBaseDirPath(){// {{{
		return this.baseDirPath;
	}// }}}

	setBaseDirPath(){// {{{
		this.baseDirPath = this.file.externalDataDirectory;
// 		this.baseDirPath = cordova.file.dataDirectory;
		console.log("BASEDIR: " + this.baseDirPath);
		//FOR FUTURE REFERENCE
// 		console.log("APP_DIR: " + this.file.applicationDirectory); //file:///android_asset/
// 		console.log("APP_STORAGE_DIR: " + this.file.applicationStorageDirectory); // file:///data/user/0/fredrich.spezialtiefbau.app/
// 		console.log("DATA_DIR: " + this.file.dataDirectory); // file:///data/user/0/fredrich.spezialtiefbau.app/files/
// 		console.log("CACHE_DIR: " + this.file.cacheDirectory); // file:///data/user/0/fredrich.spezialtiefbau.app/cache/
// 		console.log("EXTERNAL APP STORAGE DIR: " + this.file.externalApplicationStorageDirectory); // file:///storage/emulated/0/Android/data/fredrich.spezialtiefbau.app/
// 		console.log("EXTERNAL DATA DIR: " + this.file.externalDataDirectory); // file:///storage/emulated/0/Android/data/fredrich.spezialtiefbau.app/files/
// 		console.log("EXTERNAL CACHE DIR: " + this.file.externalCacheDirectory); // file:///storage/emulated/0/Android/data/fredrich.spezialtiefbau.app/cache/
// 		console.log("EXTERNAL ROOT DIR: " + this.file.externalRootDirectory); // file:///storage/emulated/0/
	}// }}}
	setProjDirPath(subDirName){// {{{
		if(subDirName[subDirName.length] === '/'){
			this.projDirPath = this.getBaseDirPath() + subDirName;
		} else {
			this.projDirPath = this.getBaseDirPath() + subDirName + '/'; 
		}
	}// }}}
	checkProjDir(){// {{{
		//check whether project dir exists, and create it if necessary.

		let replaceDir = false;
		let subDir = this.getProjDirPath().substring(this.getBaseDirPath().length);
		console.log("CHECK PROJ DIR SUBDIR: " + subDir);

		this.file.checkDir(this.getBaseDirPath(), subDir)
		.then(res => {
			console.log(JSON.stringify(res));
			console.log("SUBDIR EXISTS. DO NOTHING.");
			})
		.catch(err => {
				console.log(JSON.stringify(err));
				console.log("SUBDIR DOES NOT EXIST. CREATING SUBDIR.");
			this.file.createDir(this.getBaseDirPath(), subDir, replaceDir)
				.then(res => {
					console.log("SUBDIR SUCCESSFULLY CREATED");
				})
				.catch(err => {
					console.log("ERROR WHILE CREATING SUBDIR.");
					console.log(JSON.stringify(err));
				});
		});
	}// }}}

}
