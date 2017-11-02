import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';

import { ImageItem } from './image-item';

@Component({
  selector: 'app-update-modal-content',
  templateUrl: './update-panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class UpdateModalComponent {
  filename: String;
  description: String;
  base64: String;

  constructor(private http: Http, public activeModal: NgbActiveModal) {}

  fileOnChange(e): void {
    const that = this;
    const input = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      that.base64 = reader.result;
    };
  }

  saveUpdateClick(): void {
    const that = this;
    if (this.description && this.base64) {
      const params = {
        'filename': this.filename,
        'description': this.description,
        'value': this.base64
      };
      this.http.put('http://192.168.0.80:9001/api/image/update/', params)
               .toPromise()
               .then(function () {
                  that.activeModal.close(params);
                  // TODO
                  alert('Successed');
                 },
                 function () {
                  that.activeModal.close('Close click');
                  alert('Failed');
                 });
    } else {
      alert('Message required');
      }
  }
}

@Component({
  selector: 'app-update-modal-component',
  templateUrl: './update-btn.component.html',
  styleUrls: ['./panel.component.css']
})

export class UpdateBtnComponent {
  @Input() item: ImageItem;

  constructor(private modalService: NgbModal) {}

  open(filename): void {
    const modalRef = this.modalService.open(UpdateModalComponent);
    modalRef.result.then((value) => {
      this.item.filename = value.filename;
      this.item.description = value.description;
      this.item.value = value.value;
    });
    modalRef.componentInstance.filename = this.item.filename;
    modalRef.componentInstance.description = this.item.description;
    modalRef.componentInstance.base64 = this.item.value;
  }
}
