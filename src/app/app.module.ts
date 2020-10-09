import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ngx-ckeditor';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { DatosService } from './datos.service';
import { SeguridadGuard } from './seguridad.guard';
import { MenuComponent } from './menu/menu.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const rutas: Route[] = [
  {path:'', component: ContenidoComponent},
  {path:'inicio', component: InicioComponent, canActivate: [SeguridadGuard]},
  {path:'mensajes', component: MensajesComponent, canActivate: [SeguridadGuard]},
  {path:'usuarios', component: UsuariosComponent, canActivate: [SeguridadGuard]},
  {path:'*', component: ContenidoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContenidoComponent,
    FooterComponent,
    InicioComponent,
    MenuComponent,
    MensajesComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CKEditorModule
  ],
  providers: [DatosService, SeguridadGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }