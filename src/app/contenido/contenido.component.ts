import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  inicio = "Inicio de sesión";
  user = "";
  password = "";
  auth = false;
  entrar(){
    this.datos.login(this.user, this.password).subscribe(resp => {
      if(resp['auth']=='si'){
        this.datos.setCuenta(this.user, resp['token'], resp['level'])
        this.router.navigate(['/inicio']);
      }else{
        this.msg.error("Error de usuario y/o contraseña");
      }
    },error=>{
      this.msg.error("Error de conexión.");
      console.log(error);
    })
  }
  constructor(private datos:DatosService, private router:Router, private msg:ToastrService) {

  }

  ngOnInit(): void {
  }

  
}
