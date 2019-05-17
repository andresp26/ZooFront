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
  horariosmanana: any;
  horariostarde: any;
  cuidadores: any;
  columnDefs = [
    { headerName: 'Nombre', field: 'make' },
    { headerName: 'Nombre Cientifico', field: 'model' },
    { headerName: 'Descripcion', field: 'price' },
    { headerName: 'Especies', field: 'price' }
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
    this.tipoanimallist = [{ Valor: 1, Nombre: 'Carnivoros' },
    { Valor: 2, Nombre: 'Herbívoros' },
    { Valor: 3, Nombre: 'Roedores' },
    { Valor: 4, Nombre: 'Primates' },
    { Valor: 5, Nombre: 'Artrópodos' },
    { Valor: 6, Nombre: 'Reptiles' },
    { Valor: 7, Nombre: 'Aves' },
    { Valor: 8, Nombre: 'Acuáticos' }];

    this.especieslist  = [{ Valor: 1 , Nombre : 'Mamiferos'},
    { Valor: 1 , Nombre : 'Aves'},
    { Valor: 1 , Nombre : 'Reptiles'},
    { Valor: 1 , Nombre : 'Peces'},
    { Valor: 1 , Nombre : 'Insectos'},
    { Valor: 1 , Nombre : 'Caracoles, almejas y pulpos'}];

    this.horariosmanana = [{ Valor: 1 , Nombre: '5:00 am a 6:00 am'},
    { Valor: 1 , Nombre: '6:00 am a 7:00 am'},
    { Valor: 1 , Nombre: '7:00 am a 8:00 am'},
    { Valor: 1 , Nombre: '8:00 am a 9:00 am'},
    { Valor: 1 , Nombre: '9:00 am a 10:00 am'}];

    this.horariostarde = [{ Valor: 1 , Nombre: '4:00 pm a 5:00 pm'},
    { Valor: 1 , Nombre: '5:00 pm a 6:00 pm'},
    { Valor: 1 , Nombre: '6:00 pm a 7:00 pm'}];

    this.cuidadores = [{Valor: 1, Nombre : 'Cuidador 1'},
    {Valor: 2, Nombre : 'Cuidador 2'},
    {Valor: 3, Nombre : 'Cuidador 3'},
    {Valor: 4, Nombre : 'Cuidador 4'},
    {Valor: 5, Nombre : 'Cuidador 5'}];
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
  }


  LoadForm() {
    this.Frm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      nombrecien: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      especies: new FormControl('', [Validators.required]),
      tipoanimal: new FormControl(undefined, [Validators.required]),
      cuidador: new FormControl(undefined, [Validators.required]),
      horariom: new FormControl(undefined, [Validators.required]),
      horariot: new FormControl(undefined, [Validators.required]),
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
