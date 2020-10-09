import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario:any;
  level:string;
  nuevoUsuario = {user:'', pass:'', tipo:'', nombre:''};
  tmpUsuario = {user:'', pass:'', tipo:'', nombre:''};

  constructor(private datos:DatosService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarUsuario();
  }

  llenarUsuario(){
    this.datos.getUsusarios().subscribe(resp => {
      this.usuario = resp;
      //console.log(resp);
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);
    })
  }

  agregarUsuario(){
    if(this.nuevoUsuario.user == '' && this.nuevoUsuario.pass == '' && this.nuevoUsuario.tipo == '' && this.nuevoUsuario.nombre == ''){
      this.msg.error("Los campos son obligatorios");
      return;
    }
    this.datos.postUsuario(this.nuevoUsuario).subscribe(resp => {
      if(resp['result']=='ok'){
        let usuarios = JSON.parse(JSON.stringify(this.nuevoUsuario))
        this.usuario.push(usuarios);
        this.nuevoUsuario.user = '';
        this.nuevoUsuario.pass = '';
        this.nuevoUsuario.tipo = '';
        this.nuevoUsuario.nombre = '';
        this.msg.success("El usuario se guardo correctamente.");
      }else{
        this.msg.error("El usuario no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  temporalUsuario(usuario){
    this.tmpUsuario = JSON.parse(JSON.stringify(usuario));
  }

  guardarCambios(){
    this.datos.putUsuario(this.tmpUsuario).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.usuario.indexOf( this.usuario.find( user => user.user == this.tmpUsuario.user ));
        this.usuario[i].user = this.tmpUsuario.user;
        this.usuario[i].pass = this.tmpUsuario.pass;
        this.usuario[i].tipo = this.tmpUsuario.tipo;
        this.usuario[i].nombre = this.tmpUsuario.nombre;
        this.msg.success("El usuario se guardo correctamente.");
      }else{
        this.msg.error("El usuario no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  confirmarEliminar(){
    this.datos.deleteUsario(this.tmpUsuario).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.usuario.indexOf( this.usuario.find( user => user.user == this.tmpUsuario.user ));
        this.usuario.splice(i,1);
        this.msg.success("El usuario se elimino correctamente.");
      }else{
        this.msg.error("El usuario no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }


}