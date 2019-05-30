import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AnimalService } from 'src/app/services/animal.service';

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
    { headerName: 'Nombre', field: 'nombre' },
    { headerName: 'Nombre Cientifico', field: 'nombreCientifico' },
    { headerName: 'Descripcion', field: 'descripcion' },
    { headerName: 'Especies', field: 'especie.nombreEspecie' }
  ];

  rowData:any;
  constructor(private spinner: NgxSpinnerService,
              private alertService: AlertService,private animalesService:AnimalService) { }

  ngOnInit() {
    this.showAlerts();
    this.LoadForm();
    this.Loading();
  }

  Loading() {
    this.tipoanimallist = [];
    this.especieslist  = [];
    this.horariosmanana = [];
    this.horariostarde = [];
    this.cuidadores = [];
    this.rowData = [];

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
  }


  LoadForm() {
    //Carga de spinners desde el api
    this.cargarEspecies();
    this.cargarTiposAnimales();
    this.cargarHorarios();
    this.cargarCuidadores();
    this.cargarAnimales();

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

  cargarEspecies(){
    
    this.animalesService.getSpecies().subscribe(data=>
      this.especieslist = data
      );
  }

  cargarTiposAnimales(){
    this.animalesService.getTipoAnimal().subscribe(
      data=> this.tipoanimallist = data
    );
  }

  cargarHorarios(){
    this.animalesService.getHorarios().subscribe(
      data=> 
      (this.prepararHorarios(data))
    );
  }

  cargarCuidadores(){
    this.animalesService.getCuidadores().subscribe(
      data=> 
      (this.cuidadores = data)
    );
  }

  cargarAnimales(){
    this.animalesService.getAnimales().subscribe(
      data=> 
      (this.rowData = data)
    );
  }

  prepararHorarios(data:any){
     this.horariosmanana = data;
     this.horariostarde = data;
  }


}
