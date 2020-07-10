import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
  @Input()id: number;
  myForm: FormGroup;
  closeResult = '';

  redeemableOnce: boolean = true;
  hasExpiryDate: boolean = false;
  showCallLink: boolean = false;
  showWebLink: boolean = false;
  showFBLink: boolean = false;
  showInstaLink: boolean = false;
  showDirectLink: boolean = false;
  standardRedemptionType: boolean = false;
  barcodeRedemptionType: boolean = false;
  imageRedemptionType: boolean = false;
  redirectRedemptionType: boolean = false;
  // name: '';
  // description: '';
  // is_redeemable_once: false;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal,private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  private createForm() {
    let date = new Date();
    this.myForm = this.formBuilder.group({
      name: '',
      description: '',
      is_redeemable_once: true,
      reredemption_wait_time: 1,
      has_expiration_date: false,
      expiration_date: date,
      disable_vote: true,
      coupon_colorway: '',
      facebook_pixel_id: '',
  
      header: '',
    offer_image: '',
    offer: '',
    offer_description: '',
    redeem_button_text: '',
    vote_up_button_text: '',
    vote_down_button_text: '',
      fineprint: '',
      
      show_call_link: false,
      call_number: '',
    show_website_link: false,
    website_address: '',
    show_facebook_link: false,
    facebook_url: '',
    show_instagram_link: false,
    instagram_url: '',
    show_direction_link: false,
      direction_url: '',
  
      redemption_type: '',
    redemption_action:	'',
    show_redemption_timer: false,
  
    //Standard Options
    redemption_code: '',
  
    //BarcodeOptions
    barcode_format: '',
  
    //Image
    redemption_image: '',
    
    //redirect noinherit
    redirect_url: '',
  
      image: '',
      company_id: '',
      // color_theme: String,
      redemption_count: 7,
      like_count: 0,
      dislike_count: 0,
      short_url: ''
      // email: '',
      // password: '',
      // role: ''
    });
  }
  submitForm() {
    this.activeModal.close(this.myForm.value);
  }

  redeemableOnceChange(event){
    this.redeemableOnce = event;
    console.log(event);
  }

  hasExipryDateChange(event){
    this.hasExpiryDate = event;
  }

  showCallLinkChange(event){
    this.showCallLink = event;
    if(event)
      document.getElementById("callLinkDiv").classList.remove("hide-div");
    else
      document.getElementById("callLinkDiv").classList.add("hide-div");

  }

  showWebLinkChange(event){
    this.showWebLink = event;
    if(event)
      document.getElementById("webLinkDiv").classList.remove("hide-div");
    else
      document.getElementById("webLinkDiv").classList.add("hide-div");
  }

  showFBLinkChange(event){
    this.showFBLink = event;
    if(event)
      document.getElementById("fBLinkDiv").classList.remove("hide-div");
    else
      document.getElementById("fBLinkDiv").classList.add("hide-div");
  }

  showInstaLinkChange(event){
    this.showInstaLink = event;
    if(event)
      document.getElementById("instaLinkDiv").classList.remove("hide-div");
    else
      document.getElementById("instaLinkDiv").classList.add("hide-div");
  }

  showDirectLinkChange(event){
    this.showDirectLink = event;
    if(event)
      document.getElementById("directLinkDiv").classList.remove("hide-div");
    else
      document.getElementById("directLinkDiv").classList.add("hide-div");
  }

  redemptionTypeChange(event){
    this.standardRedemptionType = false;
    this.barcodeRedemptionType = false;
    this.imageRedemptionType = false;
    this.redirectRedemptionType = false;
  
    switch(event){
      case 'standard':
        this.standardRedemptionType=true;
        break;
      case 'barcode':
        this.barcodeRedemptionType = true;
        break;
      case 'image':
        this.imageRedemptionType = true;
        break;
      case 'redirect':
        this.redirectRedemptionType = true;
        break;
    }
  }
}
