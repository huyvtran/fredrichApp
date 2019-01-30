import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';

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
	private recordingStatus:any;
	private recordingStatusObserver:any;

	constructor(public http: HttpClient,
		private mediaCapture: MediaCapture, 
		private storage: Storage, 
		private file: File, 
		private media: Media
	) {
		console.log('Hello AudioProvider Provider');
		this.recordingStatus = Observable.create(observer => {
			this.recordingStatusObserver = observer;
		});
  }

	recordingStatusUpdates(){
		return this.recordingStatus;
	}

	captureAudio() {
		this.mediaCapture.captureAudio()
			.then(res => {
				console.log("CAPTURING AUDIO: ");
				console.log(JSON.stringify(res));
				this.storeMediaFiles(res);
				this.recordingStatusObserver.next(res);
			}, 
			(err: CaptureError) => console.error(err));
	}

	play(myFile) {
// 		let localURL = myFile.localURL.replace();
		const audioFile: MediaObject = this.media.create(myFile.localURL);
		audioFile.play();
	}

	storeMediaFiles(files) {
		this.storage.get(MEDIA_FILES_KEY)
			.then(res => {
				if (res) {
					let arr = JSON.parse(res);
					arr = arr.concat(files);
					this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
// 					console.log(JSON.stringify(arr));
				} else {
					this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
// 					console.log(JSON.stringify(files));
				}
				this.mediaFiles = this.mediaFiles.concat(files);
				console.log("MEDIA FILES: " + JSON.stringify(this.mediaFiles));
			})
  }

}
