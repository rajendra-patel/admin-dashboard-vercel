import { OnInit } from '@angular/core';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input()id: number;
  myForm: FormGroup;
  closeResult = '';

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal,private formBuilder: FormBuilder) {
    this.createForm();
  }
/*
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  */
  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      role: ''
    });
  }
  submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}
