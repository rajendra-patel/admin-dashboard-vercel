import { Component, OnInit } from '@angular/core';

import { GridOptions } from "ag-grid-community";
import { UserService } from '../../../../services/user/user.service'
import { ButtonrendererComponent } from '../buttonrenderer/buttonrenderer.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component'
@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.scss']
})
export class EditusersComponent implements OnInit {
  public gridOptions: GridOptions;
  gridApi: any;
  private responseArray: any[];
  private responseHeaders: string[];
  private responseValues: any[];
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(private userSvc: UserService,private modalService: NgbModal) {
    this.responseArray = [];
    this.responseHeaders = [];
    this.responseValues = [];

    this.frameworkComponents = {
      buttonRenderer: ButtonrendererComponent
    };
  }

  ngOnInit(): void {
    // this.columnDefs = this.createColumnDefs();
    // this.rowData = this.responseValues;

    this.gridOptions = <GridOptions>{
      onGridReady: this.onGridReady.bind(this),
      editType: "fullRow",
      suppressClickEdit: true,
      context: {
          componentParent: this
      }
    };

    this.userSvc.getAllUsers().subscribe(
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
      if(key=="_id"){
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
    console.log(customColumns);
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
    console.log(rowIdx);
    console.log(rowHeaders);
    this.gridApi.setFocusedCell(rowIdx, rowHeaders[1]);
    this.gridApi.startEditingCell({ rowIndex: rowIdx, colKey: rowHeaders[1]});

  }

  onRemove(event){
    let user = event.params.node.data;
    let nodeArr = [];
    console.log(user);
    console.log(user._id);
    nodeArr.push(user);
    this.userSvc.deleteUser(user).subscribe(
      (res:any) => {
        if(res.msg._id==user._id){
          this.gridOptions.api.applyTransaction({remove:nodeArr});
        }
      },
      (err) => {
        console.log(err);
      //handle your error here
      }
    );
  }

  rowUpdated(event){
    let user = event.data;
    let nodeArr = [];
    console.log(user);
    console.log(user._id);
    nodeArr.push(user);
    this.userSvc.updateUser(user).subscribe(
      (res:any) => {
        if(res._id==user._id){
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
    const modalRef = this.modalService.open(AddUserComponent);
    
    modalRef.result.then((result) => {
      let registrationData = {
        name: result.name,
        password: result.password,
        email: result.email,
        role: 1
      }
      console.log(result);
      console.log(registrationData);
      this.userSvc.register(registrationData).subscribe(
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
