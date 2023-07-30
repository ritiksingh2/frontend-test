import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.provider';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css']
})
export class PanelTableComponent implements OnInit {
  title = 'FrontendTest';
  opened = false;
  opened2 = false;

  displayedColumns: string[] = ['panel_name', 'mac_id', 'Lat', 'Lng','location'];
  displayedColumns2: string[] = ['parameters', 'r_phase'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  voltage: any;
  mcb: any;
  load: any;
  pf: any;
  lat: any;
  lng: any;
  center: any;
selectedPanelName: string | null = null;

  markers = new Array();
 
  panelDetails: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit():void {
    this.loadData();
  }

  loadData() {
    this.apiService.getS()
    .subscribe({
      next:(res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showPanelDetails(panel: any) {
    this.voltage = panel.r_volt_status;
    this.mcb = panel.r_mcb_status;
    this.load = panel.r_load_status;
    this.selectedPanelName = panel.panel_name;
    this.pf = panel.r_pf_status;
    this.opened=!this.opened;
  }
  map(item: any){
    this.lat = item.Lat;
    this.lng = item.Lng;
    this.center = new google.maps.LatLng(this.lat,this.lng);
    this.opened2=!this.opened2;
  }

  moveMap(){
   
    alert(this.center);
  }
}
