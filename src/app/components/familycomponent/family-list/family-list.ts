import { Component, ViewChild, OnInit } from '@angular/core';
import { FamilyService } from '../../../services/family-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Family } from '../../../models/familyModels/Family';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LoginService } from '../../../services/login-service';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-family-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    RouterLink,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './family-list.html',
  styleUrl: './family-list.css',
  providers: [provideNativeDateAdapter()]
})
export class FamilyList implements OnInit {
  dataSource: MatTableDataSource<Family> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fS: FamilyService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
  ) {
    this.filterForm = this.fb.group({
      fechaInicio: [null],
      fechaFin: [null]
    });
  }

  ngOnInit(): void {
    this.cargarFamilias();
  }

  cargarFamilias() {
    this.fS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  filtrar(): void {
    const inicio = this.filterForm.value.fechaInicio;
    const fin = this.filterForm.value.fechaFin;

    if (!inicio || !fin) {
      this.snackBar.open('Selecciona ambas fechas', 'Cerrar', { duration: 3000 });
      return;
    }

    const fechaInicio = this.formatDate(inicio);
    const fechaFin = this.formatDate(fin);

    this.fS.listByDates(fechaInicio, fechaFin).subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.dataSource.data = [];
        this.snackBar.open('No hay familias en ese rango de fechas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  limpiarFiltro(): void {
    this.filterForm.reset();
    this.cargarFamilias();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  eliminar(id: number) {
    this.fS.delete(id).subscribe({
      next: () => {
        this.cargarFamilias();
        this.snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Los usuarios deben salir de la familia antes de eliminarla',
          'Cerrar',
          { duration: 5000 }
        );
      }
    });
  }

  ingresarFamilia() {
    this.router.navigate(['/families/join']);
  }

  salirFamilia() {
    const confirmado = confirm('¿Seguro que quieres salir de tu familia actual?');
    if (!confirmado) return;

    const email = this.loginService.showEmail();

    if (!email) {
      this.snackBar.open('No se pudo identificar al usuario, vuelve a iniciar sesión', 'Cerrar', { duration: 3000 });
      return;
    }

    this.userService.getByEmail(email).subscribe({
      next: (user) => {
        this.fS.leaveFamily(user.idUser).subscribe({
          next: () => {
            this.snackBar.open('Saliste de la familia', 'Cerrar', { duration: 3000 });
            this.cargarFamilias();
          },
        });
      },
    });
  }
}