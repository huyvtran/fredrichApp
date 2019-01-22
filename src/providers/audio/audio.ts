import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MediaCapture, MediaFile, CaptureError} from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

const MEDIA_FILES_KEY = 'mediaFiles';

/*
  Generated class for the AudioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AudioProvider {

	mediaFiles = [];

	constructor(public http: HttpClient,
		private mediaCapture: MediaCapture, 
		private storage: Storage, 
		private file: File, 
		private media: Media
	) {
    console.log('Hello AudioProvider Provider');
  }

	captureAudio() {
		this.mediaCapture.captureAudio()
			.then(res => {
				this.storeMediaFiles(res);
			}, 
			(err: CaptureError) => console.error(err));
	}

	play(myFile) {
		if (myFile.name.indexOf('.wav') > -1) {
			const audioFile: MediaObject = this.media.create(myFile.localURL);
			audioFile.play();
		} else {
			//warning, should not go here
		}
	}

	storeMediaFiles(files) {
		this.storage.get(MEDIA_FILES_KEY)
			.then(res => {
				if (res) {
					let arr = JSON.parse(res);
					arr = arr.concat(files);
					this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
				} else {
					this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
				}
				this.mediaFiles = this.mediaFiles.concat(files);
			})
  }

}
