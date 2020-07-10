import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import { CouponService } from '../../../../services/coupon/coupon.service'

@Component({
  selector: 'app-listcoupons',
  templateUrl: './listcoupons.component.html',
  styleUrls: ['./listcoupons.component.scss']
})
export class ListcouponsComponent implements OnInit {

  public gridOptions: GridOptions;
  gridApi: any;
  private responseArray: any[];
  private responseHeaders: string[];
  private responseValues: any[];
  columnDefs: any[];
  rowData: any[];
  constructor(private cpnSvc: CouponService) {
    this.responseArray = [];
    this.responseHeaders = [];
    this.responseValues = [];
  }

  ngOnInit(): void {
    this.gridOptions = <GridOptions>{
      onGridReady: this.onGridReady.bind(this),
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
      customColumns.push(
          {
              headerName: key,
              field: key,
              colId: key
              // width: 100
          }
      );
    });
    return customColumns;
  }

  onGridReady(event: any){
    this.gridApi = event.api;
    this.gridApi.sizeColumnsToFit();
  }

}
