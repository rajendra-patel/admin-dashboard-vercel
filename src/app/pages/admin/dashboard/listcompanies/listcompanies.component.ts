import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import { CompanyService } from '../../../../services/company/company.service'

@Component({
  selector: 'app-listcompanies',
  templateUrl: './listcompanies.component.html',
  styleUrls: ['./listcompanies.component.scss']
})
export class ListcompaniesComponent implements OnInit {
  public gridOptions: GridOptions;
  gridApi: any;
  private responseArray: any[];
  private responseHeaders: string[];
  private responseValues: any[];
  columnDefs: any[];
  rowData: any[];

  constructor(private compSvc: CompanyService) {
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

    this.compSvc.getAllCompanies().subscribe(
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
          }
      );
    });
    return customColumns;
  }

  onGridReady(event: any){
    console.log("inside ready")
    console.log(event.api);
    this.gridApi = event.api;
    // this.gridApi.sizeColumnsToFit();
  }
}
