import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { CouponService } from '../../../../services/coupon/coupon.service'
import { ButtonrendererComponent } from '../buttonrenderer/buttonrenderer.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCouponComponent } from '../add-coupon/add-coupon.component'

@Component({
  selector: 'app-editcoupons',
  templateUrl: './editcoupons.component.html',
  styleUrls: ['./editcoupons.component.scss']
})
export class EditcouponsComponent implements OnInit {
  public gridOptions: GridOptions;
  gridApi: any;
  private responseArray: any[];
  private responseHeaders: string[];
  private responseValues: any[];
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(private cpnSvc: CouponService, private modalService: NgbModal) {
    this.responseArray = [];
    this.responseHeaders = [];
    this.responseValues = [];
    this.frameworkComponents = {
      buttonRenderer: ButtonrendererComponent
    };
  }

  ngOnInit(): void {
    this.gridOptions = <GridOptions>{
      onGridReady: this.onGridReady.bind(this),
      editType: "fullRow",
      suppressClickEdit: true,
      context: {
          componentParent: this
      }
    };

    this.cpnSvc.getAllCoupons().subscribe(
      (res) => {            

          this.responseArray.push(res);
          let tempArray: any[] = this.responseArray[0];
          this.responseHeaders.push(...Object.keys(this.responseArray[0][0]));
          for (var val of tempArray) {
            this.responseValues.push(val);
          }
          this.columnDefs = this.createColumnDefs();
          this.rowData = this.responseValues;
      },
      (err) => {
        console.log(err);
      //handle your error here
      });
  }

  private createColumnDefs() {
    let customColumns = [];
    this.responseHeaders.forEach(function (key) {
      if(key=="_id" || key=="company_id"){
        customColumns.push(
          {
              headerName: key,
              field: key,
              colId: key,
              // editable: true
          }
      );        
      } else {
        customColumns.push(
            {
                headerName: key,
                field: key,
                colId: key,
                editable: true
            }
        );
      }
    });
    customColumns.push({
      headerName: 'Edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEdit.bind(this),
        label: 'Edit'
      }
    },
    {
      headerName: 'Delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onRemove.bind(this),
        label: 'Delete'
      }
    }
    )
    return customColumns;
  }

  onGridReady(event: any){
    this.gridApi = event.api;
    this.gridApi.sizeColumnsToFit();
  }

  onEdit(event){
    this.gridApi = event.params.api;
    let rowIdx = parseInt(event.params.node.id);
    let rowHeaders = Object.keys(event.rowData);
    this.gridApi.setFocusedCell(rowIdx, rowHeaders[1]);
    this.gridApi.startEditingCell({ rowIndex: rowIdx, colKey: rowHeaders[1]});

  }

  onRemove(event){
    let coupon = event.params.node.data;

    let nodeArr = [];
    nodeArr.push(event.params.node.data);
    this.cpnSvc.deleteCoupon(coupon).subscribe(
      (res: any) => {
          console.log(res.msg);
          if(res.msg._id==coupon._id)
            this.gridOptions.api.applyTransaction({remove:nodeArr});
      },
      (err) => {
        console.log(err);
      //handle your error here
      }
    );
  }

  rowUpdated(event){
    let coupon = event.data;
    let nodeArr = [];
    console.log(coupon);
    console.log(coupon._id);
    nodeArr.push(coupon);
    this.cpnSvc.updateCoupon(coupon).subscribe(
      (res:any) => {
        if(res._id==coupon._id){
          console.log(res);
          this.gridOptions.api.applyTransaction({update:nodeArr});
        }
      },
      (err) => {
        console.log(err);
      //handle your error here
      }
    );
  }

  openFormModal() {
    const modalRef = this.modalService.open(AddCouponComponent);
    
    modalRef.result.then((couponData) => {
/*
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
*/
      console.log(couponData);
      // console.log(registrationData);
      this.cpnSvc.createCoupon(couponData).subscribe(
        (res:any) => {
          if(res.result.name==couponData.name){
            console.log(res);
            let nodeArr = [];
            nodeArr.push(res.result);
            console.log(nodeArr);
            this.gridOptions.api.applyTransaction({add:nodeArr});
          }
        },
        (err) => {
          console.log(err);
        //handle your error here
        }
      );
    }).catch((error) => {
      console.log(error);
    });

    // }).catch((error) => {
    //   console.log(error);
    // });
  }


}
