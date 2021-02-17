import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirectTo(url: string){
    this.router.navigateByUrl('dashboard/viewCategory/' + url);
    // console.log('viewCategory/:' + url);
  }
}
