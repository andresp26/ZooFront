import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {

  Frm: FormGroup;
  especieslist: any;
  tipoanimallist: any;
  columnDefs = [
    {headerName: 'Nombre', field: 'make' },
    {headerName: 'Nombre Cientifico', field: 'model' },
    {headerName: 'Descripcion', field: 'price'},
    {headerName: 'Especies', field: 'price'}
  ];
  rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];
  constructor(private spinner: NgxSpinnerService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.showAlerts();
    this.LoadForm();
    this.Loading();
  }

  Loading() {
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 2500);
  }


  LoadForm() {
    this.Frm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      nombrecien: new FormControl('', [Validators.required]),
      descripcion: new FormControl('' , [Validators.required]),
      especies: new FormControl('' , [Validators.required]),
      tipoanimal: new FormControl(undefined , [Validators.required]),
      cuidador: new FormControl(undefined , [Validators.required]),
    });
  }

  showAlerts(): void {
     this.alertService.success('this is a success alert');
  }

  GuardarAnimal() {
    if (this.Frm.valid) {

    } else {
      this.alertService.warning('Debe diligenciar todos los campos');
    }
  }


}
