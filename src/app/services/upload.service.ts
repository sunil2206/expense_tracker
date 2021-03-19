import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadTask: firebase.storage.UploadTask;
  storageRef = firebase.storage().ref();
  constructor() { }

  upload(imgUpload: HTMLInputElement, strLink: string){
    this.uploadTask = this.storageRef.child(`images/users/${imgUpload.files[0].name}`).put(imgUpload.files[0]);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED , ( snapshot) => {
        const uploadStatus = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      }, ( err ) => {
        console.log( 'error occured :: ' + err.message[0] );
      }, ( ) => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(( downloadUrl) => {
        strLink = downloadUrl;
      });
        console.log('File uploaded successfully!!!');
    });
  }

  getUrl(path: string, imgId: string, imgCtr: HTMLImageElement){
    console.log('path :: ' + path + ' imgId :: ' + imgId);
    const downloadImg = this.storageRef.child(`${path}${imgId}`).getDownloadURL().then( (data) => {
      imgCtr.src = data[0].image;
    }, ( error) => {
      console.log('Error occured :: ' + error.message[0]);
    });
  }
}
