import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  temas:any;
  level:string;
  nuevoTema = {idtema:'', nombre:''};
  tmpTema = {idtema:'', nombre:''};

  constructor(private datos:DatosService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarTemas();
  }

  llenarTemas(){
    this.datos.getTemas().subscribe(resp => {
      this.temas = resp;
      //console.log(resp);
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);
    })
  }

  verTema(tema){
    this.datos.setTemaActivo(tema.idtema, tema.nombre);
    this.router.navigate(['/mensajes']);
  }

  agregarTema(){
    if(this.nuevoTema.idtema == '' && this.nuevoTema.nombre == ''){
      this.msg.error("Los campos Id y Nombre del tema son obligatorios");
      return;
    }
    this.datos.postTema(this.nuevoTema).subscribe(resp => {
      if(resp['result']=='ok'){
        let tema = JSON.parse(JSON.stringify(this.nuevoTema))
        this.temas.push(tema);
        this.nuevoTema.idtema = '';
        this.nuevoTema.nombre = '';
        this.msg.success("El tema se guardo correctamente.");
      }else{
        this.msg.error("El tema no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  temporalTema(tema){
    this.tmpTema = JSON.parse(JSON.stringify(tema));
  }

  guardarCambios(){
    this.datos.putTema(this.tmpTema).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.temas.indexOf( this.temas.find( tema => tema.idtema == this.tmpTema.idtema ));
        this.temas[i].nombre = this.tmpTema.nombre;
        this.msg.success("El tema se guardo correctamente.");
      }else{
        this.msg.error("El tema no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  confirmarEliminar(){
    this.datos.deleteTema(this.tmpTema).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.temas.indexOf( this.temas.find( tema => tema.idtema == this.tmpTema.idtema ));
        this.temas.splice(i,1);
        this.msg.success("El tema se elimino correctamente.");
      }else{
        this.msg.error("El tema no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }


}
