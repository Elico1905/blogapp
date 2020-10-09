import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  level:string;
  user:string;
  tema = {idtema:'', nombre:''};
  nuevoMsg = {idmsj:"", idtema:"", mensaje:"", user:"", fecha:""};
  mensajes:any = [{idmsj:"", idtema:"", mensaje:"", user:"", fecha:""}];

  tmpMsg = {idmsj:"", idtema:"", mensaje:"", user:"", fecha:""};

  constructor(private datos:DatosService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.user = this.datos.getCuenta().user;
    this.tema = this.datos.getTemaActivo();
    this.llenarMensajes();
  }

  llenarMensajes(){
    this.datos.getMensajes(this.tema.idtema).subscribe(resp => {
      this.mensajes = resp;
      //console.log(resp);
    }, error => {
      console.log(error);
    })
  }

  agregarMsg(){
    if(this.nuevoMsg.mensaje == ''){
      this.msg.error("Debe escribir un mensaje");
      return;
    }
    this.nuevoMsg.idtema = this.tema.idtema;
    this.datos.postMensaje(this.nuevoMsg).subscribe(resp => {
      console.log(resp);
      if(resp['result']=='ok'){
        this.llenarMensajes();
        this.msg.success("El mensaje se guardo correctamente.");
      }else{
        this.msg.error("El mensaje no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  temporalMensaje(msj){
    console.log(msj);
    this.tmpMsg = JSON.parse(JSON.stringify(msj));
  }

  guardarCambios(){
    this.datos.putMensaje(this.tmpMsg).subscribe(resp => {
      if(resp['result']=='ok'){
        this.llenarMensajes();
        this.msg.success("El mensaje se guardo correctamente.");
      }else{
        this.msg.error("El mensaje no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  confirmarEliminar(){
    this.datos.deleteMensaje(this.tmpMsg).subscribe(resp => {
      if(resp['result']=='ok'){
        this.llenarMensajes();
        this.msg.success("El tema se elimino correctamente.");
      }else{
        this.msg.error("El tema no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }
}
