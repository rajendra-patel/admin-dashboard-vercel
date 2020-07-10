import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import { CompanyService } from '../../../../services/company/company.service'
import { ButtonrendererComponent } from '../buttonrenderer/buttonrenderer.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCompanyComponent } from '../add-company/add-company.component'

@Component({
  selector: 'app-editcompanies',
  templateUrl: './editcompanies.component.html',
  styleUrls: ['./editcompanies.component.scss']
})
export class EditcompaniesComponent implements OnInit {
  public gridOptions: GridOptions;
  gridApi: any;
  private responseArray: any[];
  private responseHeaders: string[];
  private responseValues: any[];
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(private compSvc: CompanyService,private modalService: NgbModal) {
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
    // this.gridApi.sizeColumnsToFit();
  }

  onEdit(event){
    this.gridApi = event.params.api;
    let rowIdx = parseInt(event.params.node.id);
    console.log(rowIdx);
    let rowHeaders = Object.keys(event.rowData);
    console.log(rowHeaders[1]);
    this.gridOptions.api.setFocusedCell(rowIdx, rowHeaders[1]);
    // this.gridApi.setFocusedCell(rowIdx, rowHeaders[1]);
    // this.gridApi.startEditingCell({ rowIndex: rowIdx, colKey: rowHeaders[1]});
    this.gridOptions.api.startEditingCell({ rowIndex: rowIdx, colKey: rowHeaders[1]});
  }

  onRemove(event){
    let company = event.params.node.data;
    console.log(company);

    let nodeArr = [];
    nodeArr.push(event.params.node.data);
    this.compSvc.deleteCompany(company).subscribe(
      (res: any) => {
        console.log(res);
          if(res.msg._id==company._id)
            this.gridOptions.api.applyTransaction({remove:nodeArr});
      },
      (err) => {
        console.log(err);
      //handle your error here
      }
    );
  }

  rowUpdated(event){
    let company = event.data;
    let nodeArr = [];
    nodeArr.push(company);
    this.compSvc.updateCompany(company).subscribe(
      (res:any) => {
        if(res._id==company._id){
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
    const modalRef = this.modalService.open(AddCompanyComponent);
    
    modalRef.result.then((result) => {

      console.log(result);
      console.log(result);
      this.compSvc.registerCompany(result).subscribe(
        (res:any) => {
          if(res.result.name==result.name){
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
