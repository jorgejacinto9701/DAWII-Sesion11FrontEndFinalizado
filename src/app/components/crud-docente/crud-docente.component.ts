import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-crud-docente',
  templateUrl: './crud-docente.component.html',
  styleUrls: ['./crud-docente.component.css']
})
export class CrudDocenteComponent implements OnInit {

  //Para la Grilla
   docentes: Docente [] = [];
   filtro: string ="";
 
   //Para el ubigeo
   departamentos: string[] = [];;
   provincias: string[] = [];;
   distritos: Ubigeo[] = [];;

   
  //Json para registrar o actualizar
  docente: Docente = { 
    idDocente:0,
    nombre:"",
    dni:"",
    estado:1,
    ubigeo:{
      idUbigeo: 0,
      departamento:"-1",
      provincia:"-1",
      distrito:"-1",
    }
  };

  
  constructor(private docenteService:DocenteService, 
              private ubigeoService:UbigeoService) {
      this.ubigeoService.listarDepartamento().subscribe(
          response => this.departamentos = response
      );            
  }

  cargaProvincia(){
      this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
        response =>  this.provincias= response
      );
  }

  cargaDistrito(){
    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
      response =>  this.distritos= response
     );
   }

  ngOnInit(): void {}

  consulta(){
    console.log(" ==> En consulta() ==> filtro = " + this.filtro);
    
    this.docenteService.consulta(this.filtro).subscribe(
        response => this.docentes = response
    );
  }

  registra(){
    console.log(" ==> registra ==> departamento ==> " + this.docente.ubigeo?.departamento);
    console.log(" ==> registra ==> provincia ==> " + this.docente.ubigeo?.provincia);
    console.log(" ==> registra ==> distrito ==> " + this.docente.ubigeo?.distrito);
    console.log(" ==> registra ==> idUbigeo ==> " + this.docente.ubigeo?.idUbigeo);
    console.log(this.docente);

    this.docente.estado = 1;
    this.docenteService.registra(this.docente).subscribe(
        response =>{
              console.log(response.mensaje);
              alert(response.mensaje);

              this.docenteService.consulta(this.filtro).subscribe(
                response => this.docentes = response
              );
              
              this.docente = { 
                idDocente:0,
                nombre:"",
                dni:"",
                estado:1,
                ubigeo:{
                  idUbigeo: 0,
                  departamento:"-1",
                  provincia:"-1",
                  distrito:"-1",
                  }
              }   
        },
        error => {
            console.log(error);
        },
    );
    
  }


  busca(aux:Docente){
    console.log(" ==> busca ==> id ==> " + aux.idDocente);
    console.log(" ==> busca ==> departamento ==> " + this.docente.ubigeo?.departamento);
    console.log(" ==> busca ==> provincia ==> " + this.docente.ubigeo?.provincia);
    console.log(" ==> busca ==> distrito ==> " + this.docente.ubigeo?.distrito);
    console.log(" ==> busca ==> idUbigeo ==> " + this.docente.ubigeo?.idUbigeo);
    this.docente = aux;

      this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
        response =>  this.provincias= response
      );
  
    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
      response =>  this.distritos= response
     );

  }
  
  
  actualiza(){
    console.log(" ==> actualiza ==> departamento ==> " + this.docente.ubigeo?.departamento);
    console.log(" ==> actualiza ==> provincia ==> " + this.docente.ubigeo?.provincia);
    console.log(" ==> actualiza ==> distrito ==> " + this.docente.ubigeo?.distrito);
    console.log(" ==> actualiza ==> idUbigeo ==> " + this.docente.ubigeo?.idUbigeo);
    console.log(this.docente);

    this.docenteService.actualiza(this.docente).subscribe(
      response =>{
              console.log(response.mensaje);
              alert(response.mensaje);

              this.docenteService.consulta(this.filtro).subscribe(
                response => this.docentes = response
              );
              
              this.docente = { 
                idDocente:0,
                nombre:"",
                dni:"",
                estado:1,
                ubigeo:{
                  idUbigeo: 0,
                  departamento:"-1",
                  provincia:"-1",
                  distrito:"-1",
                  }
              }   
        },
        error => {
            console.log(error);
        },
    );

  }

  getEstado(estado:number):string{
    var salida = "";
    console.log(" ==>  estado ==> " + estado );
    if (estado == 1){
       salida =  "Activo";
    }else{
      salida =  "Inactivo";
    }
    return salida == null? "":salida;
  }

  getTextoBotonEstado(estado:number):string{
    var salida = "";
    console.log(" ==>  estado ==> " + estado );
    if (estado == 1){
       salida =  "Desactivar";
    }else{
      salida =  "Activar";
    }
    return salida == null? "":salida;
  }



  actualizaEstado(aux:Docente){
    console.log(" ==> En actualizaEstado() ");
    
    //Cambia el estado
    this.docente = aux;
    this.docente.estado = (aux.estado==1)? 0 : 1;

    this.docenteService.actualiza(this.docente).subscribe(
        response =>{
              console.log(response.mensaje);

              this.docenteService.consulta(this.filtro).subscribe(
                response => this.docentes = response
              );
              
              this.docente = { 
                idDocente:0,
                nombre:"",
                dni:"",
                estado:1,
                ubigeo:{
                  idUbigeo: 0,
                  departamento:"-1",
                  provincia:"-1",
                  distrito:"-1",
                  }
              }   
        },
        error => {
            console.log(error);
        },
    );
  }

}
