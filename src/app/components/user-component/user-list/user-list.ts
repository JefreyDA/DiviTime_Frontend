import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { InsertingUsers } from '../../../models/userModels/User';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/user-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-user-list',
  imports: [
    NgClass,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<InsertingUsers> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS:UserService){}
    ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.uS.listAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminarPorId(id:number){
    this.uS.deleteUser(id).subscribe((data) => {
      this.uS.listAll().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }

  filtrarEstado(estado: boolean | null) {
    if (estado === null) {
      this.uS.listAll().subscribe((data) => {
        this.dataSource.data = data;
      });
    }

    if (estado === true) {
      this.uS.listActiveUsers().subscribe((data) => {
        this.dataSource.data = data;
      });
    }

    if (estado === false) {
      this.uS.listInactiveUsers().subscribe((data) => {
        this.dataSource.data = data;
      });
    }
  }
}
