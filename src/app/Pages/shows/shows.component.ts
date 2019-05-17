import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  columnDefs = [
    {headerName: 'Nombre', field: 'make' },
    {headerName: 'Nombre Cientifico', field: 'model' },
    {headerName: 'Descripcion', field: 'price'},
    {headerName: 'Especies', field: 'price'}
  ];
  constructor(private spinner: NgxSpinnerService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.Loading();
  }

  Loading() {
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 2500);
  }

}
