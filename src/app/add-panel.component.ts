import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-modal-content',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class AddModalComponent {
  defaultURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAEOElEQVR4Ae2dyVIqQRRERdtx4f9/puHCAaeXERVA3RSVBearMk4vjE4HsvqcpoDNdXV3d/fw8PD4+Pjy8nLCkSVwfn6+rNdr0b+/v39+fs6203ZyeXm5vL296d4XfR2nm2O1WoHnlwh8fHy8bw5VLNsawb/YHGdnZ9vvc3JcArrjteu0Q4/sAm5ubq6vr7U3HbeVR9sS0H6jPV/x9fVVX12A6N/e3mpv2v4BJ8cloK1eDyj6T09POtkJ0L6vnUf3vujr2GxT79qzjruCwKPpWjYvZ6cDvp4JslC3he0E9FxEf7NNrbVn9T+a4lyXt3k5uxj89ew7AfN+PtAtpr1U98qyLBMLmPfzgbbQRv/q6mrwp+z+Z4D2/ek+H9j7a73Z0CWM/wK2X0B/18zy+cDeX/eXMPL5oQLG/3xg769Hht6v7VAB438+sPfX/UWOfP6zgP7zweCvaf3765Gh92s77QPneQIIyDMvjQgoOPIBAXnmpREBBUc+ICDPvDQioODIBwTkmZdGBBQc+YCAPPPSiICCIx8QkGdeGhFQcOQDAvLMSyMCCo58QECeeWlEQMGRDwjIMy+NCCg48gEBeealEQEFRz4gIM+8NCKg4MgHBOSZl0YEFBz5gIA889KIgIIjHxCQZ14aEVBw5AMC8sxLIwIKjnxAQJ55aURAwZEPCMgzL40IKDjyAQF55qURAQVHPiAgz7w0IqDgyAcE5JmXRgQUHPmAgDzz0oiAgiMfEJBnXhoRUHDkAwLyzEsjAgqOfEBAnnlpREDBkQ8IyDMvjQgoOPLh55lx/QzR/PoOb9TQvu2s0AHnRX91IT8LaHOk28R1TcX76oH++/fb2EqNvNaCBx9X3LM6VID+RhPXR76w7eDWvymgzbsf+alto4v7u2zk8/3PgH5W6Mir79fW1tyeoxrePcsM0f0C2rzoNgFee2t/nVOct/H1+hcCupDBF/ydAC1d8/e1tw5+DZ+Xp+dB+wcOcwsQfc0qHn8C/GcB2o6Evh2ffzrUd/Y/A/r9dKjl/r3FjL5F/j3idkUIMCDpiIA0cetDgAFJRwSkiVsfAgxIOiIgTdz6EGBA0hEBaeLWhwADko4ISBO3PgQYkHREQJq49SHAgKQjAtLErQ8BBiQdEZAmbn0IMCDpiIA0cetDgAFJRwSkiVsfAgxIOiIgTdz6EGBA0hEBaeLWhwADko4ISBO3PgQYkHREQJq49SHAgKQjAtLErQ8BBiQdEZAmbn0IMCDpiIA0cetDgAFJRwSkiVsfAgxIOiIgTdz6EGBA0hEBaeLWhwADko4ISBO3PgQYkHREQJq49SHAgKQjAtLErW83L2iW+aB2AdNFm2+6EzDLfNDpiNuCbb6pC9BvDz4f1K5numjzTV3A+PNBpyNuC7b5posGDGrIowZt2u8Rf4lAP49P2BeNd5x3PugvMYo9rG79fwaziZ4vU4YEAAAAAElFTkSuQmCC';
  filename = '';
  description = '';
  base64 = '';
  dataURL = this.defaultURL;

  constructor(private http: Http, public activeModal: NgbActiveModal) {}

  fileOnChange(e): void {
    const that = this;
    const input = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(input);
    this.filename = input.name;
    reader.onload = function () {
      that.base64 = reader.result;
      that.dataURL = reader.result;
    };
  }

  clearPanel(): void {
    this.filename = '';
    this.description = '';
    this.base64 = '';
    this.dataURL = this.defaultURL;
  }

  saveAddClick(): void {
    const that = this;
    if (this.filename && this.description && this.base64) {
      const params = {
        'filename': this.filename,
        'description': this.description,
        'value': this.base64
      };
      this.http.post('http://192.168.0.80:9001/api/image/create/', params)
               .toPromise()
               .then(function () {
                  that.activeModal.close('Close click');
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
  selector: 'app-add-modal-component',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./panel.component.css']
})

export class AddBtnComponent {

  constructor(private modalService: NgbModal) {}

  open(): void {
    const modalRef = this.modalService.open(AddModalComponent);
  }
}
