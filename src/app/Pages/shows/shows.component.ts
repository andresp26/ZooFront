import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  frm: FormGroup;
  date: Date = new Date();
  columnDefs = [
    {headerName: 'Nombre', field: 'make' },
    {headerName: 'Nombre Cientifico', field: 'model' },
    {headerName: 'Descripcion', field: 'price'},
    {headerName: 'Especies', field: 'price'}
  ];
  settings = {
    bigBanner: false,
    timePicker: true,
    format: 'hh:mm a',
    closeOnSelect: true
  };
  constructor(private spinner: NgxSpinnerService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.Loading();
    this.LoadForm();
  }


  LoadForm() {
    this.frm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      selanimal: new FormControl(undefined, [Validators.required]),
      horariom: new FormControl(undefined, [Validators.required]),
      horariot: new FormControl(undefined, [Validators.required]),
      persona: new FormControl(undefined, [Validators.required]),
      lugar: new FormControl(undefined, [Validators.required]),
    });
  }

  Loading() {
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 2500);
  }

}
