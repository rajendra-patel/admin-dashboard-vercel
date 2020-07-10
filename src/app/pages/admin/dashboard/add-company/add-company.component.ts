import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  @Input()id: number;
  myForm: FormGroup;
  closeResult = '';

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal,private formBuilder: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      company_id: '',
      name: '',
      address_1: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone_number: '',
      facebook: '',
      instagram: '',
      featured_image: '',
      logo: '',
      short_url: ''
    });
  }
  submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}
