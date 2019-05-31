import { Component, OnInit, ViewChild } from "@angular/core";
import { NumberSymbol } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertService } from "ngx-alerts";
import { AnimalService } from "src/app/services/animal.service";
import { finalize } from "rxjs/operators";
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {


  @ViewChild('Grid') agGrid: AgGridNg2;
  Frm: FormGroup;
  especieslist = [];
  tipoanimallist = [];
  horariosmanana = [];
  horariostarde = [];
  cuidadores = [];
  date: Date = new Date();
  editar = false;
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
    { headerName: 'Cuidador', field: 'cuidador.idPersona.nombreCompleto' },
    { headerName: 'Especie', field: 'especie.nombreEspecie' },
    { headerName: 'Tipo Animal', field: 'tipoAnimal.nombreTipoAnimal' } 
  ];

  rowData: any;
  constructor(
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private animalesService: AnimalService
  ) {}

  ngOnInit() {
    this.LoadForm();
    this.LoadInfo();
  }

  LoadForm() {
    this.Frm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      nombrecien: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      especies: new FormControl(undefined, [Validators.required]),
      tipoanimal: new FormControl(undefined, [Validators.required]),
      cuidador: new FormControl(undefined, [Validators.required])
    });
  }


  Editar() {
    try {
      const objEdit = this.agGrid.api.getSelectedRows();
      if (objEdit.length > 0) {
        this.Frm.controls.nombre.setValue(objEdit[0].nombre);
        this.Frm.controls.nombrecien.setValue(objEdit[0].nombreCientifico);
        this.Frm.controls.descripcion.setValue(objEdit[0].descripcion);
        this.Frm.controls.especies.setValue(objEdit[0].especie);
        this.Frm.controls.tipoanimal.setValue(objEdit[0].tipoAnimal);
        this.Frm.controls.cuidador.setValue(objEdit[0].cuidador);
      }
    } catch (error) {

    }
  }

  EditarAnimal() {
    if (this.Frm.valid) {
      const Animal = {
        nombre: this.Frm.controls.nombre.value,
        nombreCientifico: this.Frm.controls.nombrecien.value,
        descripcion: this.Frm.controls.descripcion.value,
        especie: this.Frm.controls.especies.value,
        tipoAnimal: this.Frm.controls.tipoanimal.value,
        cuidador: this.Frm.controls.cuidador.value
      };
      console.log(Animal);
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
  }

  LoadInfo() {
    this.cargarEspecies();
    this.cargarTiposAnimales();
    this.cargarHorarios();
    this.cargarCuidadores();
    this.cargarAnimales();
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
        console.log(Animal);
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
          console.log(data);
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
