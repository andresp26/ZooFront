import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ShowService } from 'src/app/services/show.service';
import { AnimalService } from 'src/app/services/animal.service';
import { finalize } from "rxjs/operators";
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  @ViewChild('ShowsGrid') agGrid: AgGridNg2;
  animalesList = [];
  horariosList=[];
  lugaresList = [];
  cuidadoresList=[];
  rowData= [];
  frm: FormGroup;
  date: Date = new Date();
  columnDefs = [
    {headerName: 'Nombre', field:'idShow.nombre' },
    {headerName: 'Animal', field: 'idAnimal.nombre' },
    {headerName: 'Hora Inicio', field: 'idShow.horario.fechaInicio'},
    {headerName: 'Hora Final', field: 'idShow.horario.fechaFin'},
    {headerName: 'Lugar', field: 'idShow.lugar.nombreLugar'},
    {headerName: 'Encargado', field: 'idShow.personaEncargada.nombreCompleto'}
  ];
  settings = {
    bigBanner: false,
    timePicker: true,
    format: 'hh:mm a',
    closeOnSelect: true
  };
  constructor(private spinner: NgxSpinnerService,
              private alertService: AlertService, private showService:ShowService, private animalesService: AnimalService) { }
  ngOnInit() {
    this.Loading();
    this.LoadForm();
    this.loadData();
  }

  loadData(){
    this.cargarAnimales();
    this.cargarShows();
    this.cargarLugares();
    this.cargarCuidadores();
    this.cargarHorarios();
  }



  LoadForm() {
    this.frm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      selanimal: new FormControl(undefined, [Validators.required]),
      horario: new FormControl(undefined,[Validators.required]),
      // horariom: new FormControl(undefined, [Validators.required]),
      // horariot: new FormControl(undefined, [Validators.required]),
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

  cargarAnimales() {
    this.animalesService
      .getAnimales()
      .pipe(
        finalize(() => {
          // ocultar ventana de carga
          this.spinner.hide();
        })
      )
      .subscribe(
        (data: []) => {
          console.log('Animales');
          console.log(data);
          this.animalesList = data;
          
        },
        (error: any) => {
          this.alertService.danger(error.message);
        }
      );
  }

  cargarShows(){
    this.showService
    .getAllShows()
    .pipe(
      finalize(() => {
        // ocultar ventana de carga
        this.spinner.hide();
      })
    )
    .subscribe(
      (data: []) => {
        console.log('shows');
        console.log(data);
        this.rowData = data;
      
      },
      (error: any) => {
        this.alertService.danger(error.message);
      }
    );

  }

  cargarHorarios(){
    this.showService
    .getHorarios()
    .pipe(
      finalize(() => {
        // ocultar ventana de carga
        this.spinner.hide();
      })
    )
    .subscribe(
      (data: []) => {
        console.log('horarios');
        console.log(data);
        this.horariosList = data;
      
      },
      (error: any) => {
        this.alertService.danger(error.message);
      }
    );

  }

  cargarLugares(){
    this.showService
    .getLugares()
    .pipe(
      finalize(() => {
        // ocultar ventana de carga
        this.spinner.hide();
      })
    )
    .subscribe(
      (data: []) => {
        console.log('lugares');
        console.log(data);
        this.lugaresList = data;  
      },
      (error: any) => {
        this.alertService.danger(error.message);
      }
    );

  }

  cargarCuidadores() {
    this.animalesService.getCuidadores().subscribe((data: []) => {
      console.log('Cuidadores');
      console.log(data);
      this.cuidadoresList = data;
    });
  }

}
