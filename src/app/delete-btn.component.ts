import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { ImageItem } from './image-item';

@Component({
  selector: 'app-delete-btn',
  template: `
		<button type="button" class="btn btn-index btn-delImg" (click)="delete()">
			<span class="glyphicon glyphicon-trash"></span>
		</button>
	`,
  styleUrls: ['./delete-btn.component.css']
})

export class DeleteBtnComponent {
  @Input() item: ImageItem;
  @Output() childEvent = new EventEmitter<any>();

  constructor(private http: Http) {}

  delete(): void {
    const that = this;
    const url = 'http://192.168.0.80:9001/api/image/delete?name=' + this.item.filename;
      this.http.delete(url)
      .toPromise()
      .then(function () {
        alert('Successed');
        that.childEvent.emit();
      },
      function () {
        alert('Failed');
      });
  }
}
