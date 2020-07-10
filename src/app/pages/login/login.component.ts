import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  reg_username: string;
  reg_password: string;
  username: string;
  password: string;
  isValidUser: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { this.isValidUser=true;}

  ngOnInit(): void {
  }

  login(){
    let loginData = { "email": this.username, "password": this.password };
    this.authService.login(loginData).subscribe(
      (res) => {
          console.log(res);
          localStorage.setItem("token", res['token']);
          if(res['token']) {
            this.authService.loggedIn(true);
            this.isValidUser=true;
            this.router.navigate(['/dashboard']);
          } else {
            this.authService.loggedIn(false);
            this.isValidUser=false;
          }
      },
      (err) => {
        console.log(err);
      //handle your error here
      });
    // if(localStorage.getItem("token")) {

    // } else {

    // }
    // this.authService.isLoggedIn();
/*
    if(this.authService.isLoggedIn()){
      this.isValidUser=true;
      console.log("login success");
      this.router.navigate(['dashboard']);
    } else {
      this.isValidUser=false;
    }
    */
  }


/*
  registerCompany() {
    let companyData = { 
      company_id: "8789",
      name: "Oogle",
      address_1: "NewYork New York",
      city: "New York",
      state: "New York",
      zip: "109221",
      country: "USA",
      phone_number: "+1 234 4567 321",
      facebook: "facebook.com/oogle",
      instagram: "@Oogle",
      featured_image: "image.com/oogle",
      logo: "logo.com/oogle",
      short_url: "oogle.com"
    }

    this.authService.registerCompany(companyData).subscribe(
      (res) => {
        if(res){
          console.log(res);     
        }
      },
      (err) => {
        console.log(err);
      //handle your error here
      });
  }
*/
  isUserLoggedIn(){
    return this.isValidUser;
  }
/*
  createCoupon(){
    let date = new Date();
    let couponData={
      description: "something just like this",
      is_redeemable_once: true,
      reredemption_wait_time: 7,
      has_expiration_date: true,
      expiration_date: date,
      disable_vote: false,
      coupon_colorway: "#ffff",
      facebook_pixel_id: "req.body.facebook_pixel_id",
  
      header: "COFFEE COUPON",
      offer_image: "coffeeurl.in",
      offer: "some offer",
      offer_description: "get this free with that",
      redeem_button_text: "get it now!",
      vote_up_button_text: "hit me",
      vote_down_button_text: "dont hit me",
      fineprint: "T&C",
      
      show_call_link: true,
      call_number: "9999999911",
      show_website_link: true,
      website_address: "www.website.com",
      show_facebook_link: true,
      facebook_url: "www.facebook.com",
      show_instagram_link: true,
      instagram_url: "instagram.com",
      show_direction_link: true,
      direction_url: "maps.direction.com",
  
      redemption_type: "standard",
      redemption_action:	"redeem on website",
      show_redemption_timer: true,
  
      //Standard Options
      redemption_code: "9C2SUF",
  
      //BarcodeOptions
      barcode_format: "barcodeformat",
  
      //Image
      redemption_image: "image.com/redemptionimage",
      
      //redirect noinherit
      redirect_url: "bit.ly/redirect",

      name: "coffee with subscription",
      image: "coffee offer url",
      company_id: 99,
      // color_theme: req.body.color_theme,
      redemption_count: 0,
      like_count: 1,
      dislike_count: 2,
      short_url: "short.url"

    };
    console.log(date);
    console.log(couponData);
    
    this.authService.createCoupon(couponData).subscribe(
      (res) => {
        if(res){
          console.log(res);     
        }
      },
      (err) => {
        console.log(err);
      //handle your error here
      });

  }
*/
}
