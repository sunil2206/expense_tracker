import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fileName;
  fileName1;
  path = 'images/users/';
  imgId: string;
  uploadStatus: number;
  private vUid;

  constructor(private upSer: UploadService , private db: AngularFireDatabase, private userSer: UserService) {

    this.vUid = sessionStorage.getItem('uid');

    this.db.list('/users', ref => ref.orderByChild('key').equalTo(this.vUid)).valueChanges()
      .subscribe( data => this.getImg(data));
  }

  ngOnInit(): void {
  }

  async getImg(data){
    let temp = await data[0].image;
    let firStore = firebase.storage();
    try{
      let imgLink = await  firStore.ref(`/images/users/${ temp }`).getDownloadURL();
      this.fileName = imgLink;
    }
    catch (e) {
      if (e.code === 'storage/object-not-found'){
        console.log('Image not found!!');
      }
    }

  }

  uploadImg(img: HTMLInputElement){
    this.upSer.upload(img, this.fileName1);
    this.userSer.updateImg(this.vUid, img.files.item(0).name);
    // this.uploadStatus = 0;
  }

  viewFile(imgUpload: HTMLInputElement){
    console.log('File :: ' + imgUpload.files.item(0).name);
    const reader = new FileReader();
    reader.readAsDataURL(imgUpload.files[0]);
    reader.onload = (e) => {
      this.fileName = reader.result;
    };
  }
}
