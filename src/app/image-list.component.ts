import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { ImageItem } from './image-item';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})

export class ImageListComponent implements OnInit {

  imageList: ImageItem[];

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.http.get('http://192.168.0.80:9001/api/image/get/')
    .map(res => res.json())
    .subscribe(data => {
      if (data.data) {
        this.imageList = data.data.slice(0, 9);
      }
    });
  }

  deleteImageByIndex(index): void {
    this.imageList.splice(index, 1);
  }
}
