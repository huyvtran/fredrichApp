import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var cordova: any; // global variable for paths

/*
  Generated class for the FileHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileHandlerProvider {

	projDirPath: string;

  constructor(public http: HttpClient) {
    console.log('Hello FileHandlerProvider Provider');
  }

	public moveFileToProjDir(path, fileName, newFileName){

	}

	public moveFile(path, fileName, newPath, newFileName){
// 		console.log("MOVING FILE:" + path + fileName + " TO: " + newPath + newFileName);
// 		console.log("CHECKING SUBDIR");
// 		//XXX DIRTY HACKS
// 		let basePath
// 		this.file.checkDir(basePath, subDir)
// 		.then(res => {
// 			console.log(JSON.stringify(res));
// 			console.log("SUBDIR EXISTS. COPYING FILE.");
// 			this.file.copyFile(path, fileName, newPath, newFileName)
// 			.then(res=> {
// 				console.log(JSON.stringify(res));
// 			})
// 			.catch(err => {console.log(JSON.stringify(err));});
// 		})
// 		.catch(err => {
// 			console.log(JSON.stringify(err));
// 			console.log("SUBDIR DOES NOT EXIST. CREATING SUBDIR.");
// 			let replace = false;
// 			this.file.createDir(basePath, subDir, replace)
// 				.then(res => {
// 					this.file.copyFile(path, fileName, newPath, newFileName)
// 					.then(res=> {
// 						console.log(JSON.stringify(res));
// 					});
// 				})
// 				.catch(err => {console.log(JSON.stringify(err));});
// 		});
	}


	getProjDirPath(){
		return this.projDirPath;
	}

	setProjDirPath(subDirName){
		let baseDir = cordova.file.dataDirectory;
		console.log("BASEDIR");
		console.log(baseDir);
		if(subDirName[subDirName.length] === '/'){
			this.projDirPath = baseDir + subDirName;
		} else {
			this.projDirPath = baseDir + subDirName + '/'; 
		}
	}

}
