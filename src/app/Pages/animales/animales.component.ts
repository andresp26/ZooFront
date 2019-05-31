import { Component, OnInit } from "@angular/core";
import { NumberSymbol } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertService } from "ngx-alerts";
import { AnimalService } from "src/app/services/animal.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {
  Frm: FormGroup;
  especieslist = [];
  tipoanimallist = [];
  horariosmanana = [];
  horariostarde = [];
  cuidadores = [];
  date: Date = new Date();
  settings = {
    bigBanner: false,
    timePicker: true,
    format: 'hh:mm a',
    closeOnSelect: true
  };
  columnDefs = [
    { headerName: 'Nombre', field: 'nombre' },
    { headerName: 'Nombre Cientifico', field: 'nombreCientifico' },
    { headerName: 'Descripcion', field: 'descripcion' },
    { headerName: 'Especies', field: 'especie.nombreEspecie' }
  ];

  rowData: any;
  constructor(
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private animalesService: AnimalService
  ) {}

  ngOnInit() {
    this.showAlerts();
    this.LoadForm();
    this.LoadInfo();
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
      horariot: new FormControl(undefined, [Validators.required])
    });
  }

  LoadInfo() {
    this.cargarEspecies();
    this.cargarTiposAnimales();
    this.cargarHorarios();
    this.cargarCuidadores();
    this.cargarAnimales();
  }

  showAlerts(): void {
    this.alertService.success('this is a success alert');
  }

  GuardarAnimal() {
    try {
      if (this.Frm.valid) {
        const Animal = {
          nombre: this.Frm.controls.nombre.value,
          nombreCientifico: this.Frm.controls.nombrecien.value,
          descripcion: this.Frm.controls.descripcion.value,
          especie: this.Frm.controls.especies.value,
          tipoAnimal: this.Frm.controls.tipoanimal.value,
          cuidador: this.Frm.controls.cuidador.value
        };
        this.spinner.show();
        this.animalesService.SetAnimal(Animal).subscribe(data => {
          console.log(data);
          this.alertService.success('Operacion Exitosa');
          this.LoadInfo();
          this.Frm.reset();
          this.spinner.hide();
        });
      } else {
        this.alertService.warning('Debe diligenciar todos los campos');
      }
    } catch (error) {}
  }

  cargarEspecies() {
    this.animalesService.getSpecies().subscribe((data: []) => {
      console.log('Especies');
      this.especieslist = data;
    });
  }

  cargarTiposAnimales() {
    this.spinner.show();
    this.animalesService
      .getTipoAnimal()
      .pipe(
        finalize(() => {
          // ocultar ventana de carga
          this.spinner.hide();
        })
      )
      .subscribe(
        (data: []) => {
          console.log('Tipo Animales');
          this.tipoanimallist = data;
        },
        (error: any) => {
          this.alertService.danger(error.message);
        }
      );
  }

  cargarHorarios() {
    this.animalesService.getHorarios().subscribe(data => {
      console.log('horarios');
      console.log(data);
      this.prepararHorarios(data);
    });
  }

  cargarCuidadores() {
    this.animalesService.getCuidadores().subscribe((data: []) => {
      console.log('Cuidadores');
      this.cuidadores = data;
    });
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
          this.rowData = data;
        },
        (error: any) => {
          this.alertService.danger(error.message);
        }
      );
  }
  prepararHorarios(data: any) {
    this.horariosmanana = data;
    this.horariostarde = data;
  }
}
