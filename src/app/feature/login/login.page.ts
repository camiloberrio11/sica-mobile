import { ToastService } from './../../core/services/toast.service';
import { LoadingService } from './../../core/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  viewPassword = false;

  constructor(
    private router: Router,
    private readonly loadingService: LoadingService,
    private readonly backendSicaService: SicaBackendService,
    private toastrService: ToastService
  ) {}

  ngOnInit() {}

  async handleLogin(): Promise<void> {
    await this.loadingService.initLoading('Iniciando sesion');
    this.backendSicaService
      .login({ username: this.username, password: this.password })
      .subscribe(
        async (data) => {
          this.username = '';
          this.password = '';
          await this.loadingService.endLoading();
          this.router.navigate(['/auth/select-construction']);
        },
        async (err) => {
          await this.toastrService.createToast(
            'Usuario / Contraseña incorrectos',
            'warning'
          );
          await this.loadingService.endLoading();
        }
      );
  }
}
