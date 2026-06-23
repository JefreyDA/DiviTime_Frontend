import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ListRole } from '../../../models/Role';
import { RoleService } from '../../../services/role-service';

@Component({
  selector: 'app-rol-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  templateUrl: './rol-list.html',
  styleUrl: './rol-list.css',
})
export class RolList {
  dataSource: MatTableDataSource<ListRole> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rS: RoleService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadRoles() {
    this.rS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
    });
  }
}
