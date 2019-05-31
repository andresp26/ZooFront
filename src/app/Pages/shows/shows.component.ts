import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ShowService } from 'src/app/services/show.service';
import { AnimalService } from 'src/app/services/animal.service';
import { finalize } from "rxjs/operators";

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
        
      },
      (error: any) => {
        this.alertService.danger(error.message);
      }
    );

  }

}
