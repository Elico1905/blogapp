import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

const URL:string = "http://localhost/blogrest/";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private cuenta = {user:"", token:"", level:""}
  private temaActivo = {idtema:'', nombre:''};

  constructor(private http: HttpClient, private galleta:CookieService) { 
    
  }

  getCuenta(){
    this.cuenta.user = this.galleta.get('user');
    this.cuenta.token = this.galleta.get('token');
    this.cuenta.level = this.galleta.get('level');
    return this.cuenta;
  }
  
  setCuenta(user,token,nivel){
    this.cuenta.user = user;
    this.cuenta.token = token;
    this.cuenta.level = nivel;
    this.galleta.set('user',user);
    this.galleta.set('token',token);
    this.galleta.set('level',nivel);
  }

  getTemaActivo(){
    this.temaActivo.idtema = sessionStorage.getItem("idtema");
    this.temaActivo.nombre = sessionStorage.getItem("nombretema");
    return this.temaActivo;
  }

  setTemaActivo(idtema, nombre){
    this.temaActivo.idtema = idtema;
    this.temaActivo.nombre = nombre;
    sessionStorage.setItem("idtema", idtema);
    sessionStorage.setItem("nombretema", nombre)
  }

  login(u, p){
    let Params = new HttpParams();
    Params = Params.append('user', u);
    Params = Params.append('pass', p);

    return this.http.get(URL + "login.php",{params:Params});

  }

  getTemas(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "temas.php", {headers:Headers});
  }

  postTema(tema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('id', tema.idtema);
    formData.append('nombre', tema.nombre);

    return this.http.post(URL + "temas.php", formData, {headers:Headers});
  }

  putTema(tema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id', tema.idtema);
    Params = Params.append('nombre', tema.nombre);

    return this.http.put(URL + "temas.php", null, {headers: Headers, params: Params});
  }

  deleteTema(tema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id', tema.idtema);

    return this.http.delete(URL + "temas.php", {headers: Headers, params: Params});
  }

  getMensajes(idtema){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    if(idtema!='') Params = Params.append('idtema', idtema);
    return this.http.get(URL + "mensajes.php", {headers: Headers, params: Params});
  }

  postMensaje(msg){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('idtema', msg.idtema);
    formData.append('mensaje', msg.mensaje);

    return this.http.post(URL + "mensajes.php", formData, {headers:Headers});
  }

  putMensaje(msg){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('idmsj', msg.idmsj);
    Params = Params.append('mensaje', msg.mensaje);

    return this.http.put(URL + "mensajes.php", null, {headers: Headers, params: Params});
  }

  deleteMensaje(msg){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('idmsj', msg.idmsj);

    return this.http.delete(URL + "mensajes.php", {headers: Headers, params: Params});
  }

  getUsusarios(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "usuarios.php", {headers:Headers});
  }

  postUsuario(usuario){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('user', usuario.user);
    formData.append('pass', usuario.pass);
    formData.append('tipo', usuario.tipo);
    formData.append('nombre', usuario.nombre);

    return this.http.post(URL + "usuarios.php", formData, {headers:Headers});
  }

  putUsuario(usuario){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('user', usuario.user);
    Params = Params.append('pass', usuario.pass);
    Params = Params.append('tipo', usuario.tipo);
    Params = Params.append('nombre', usuario.nombre);

    return this.http.put(URL + "usuarios.php", null, {headers: Headers, params: Params});
  }

  deleteUsario(usuario){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('user', usuario.user);

    return this.http.delete(URL + "usuarios.php", {headers: Headers, params: Params});
  }

}