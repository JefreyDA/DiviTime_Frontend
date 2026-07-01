import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Expense } from '../../../models/expenseModels/Expense';
import { ExpenseService } from '../../../services/expense-service';
import { ExpenseType } from '../../../models/ExpenseType';
import { InsertingUsers } from '../../../models/userModels/User';
import { ExpenseTypeService } from '../../../services/expense-type-service';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-expense-list',
  imports: [MatTableModule, MatIcon, MatButtonModule, RouterLink],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList implements OnInit{
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7','c8','c9','c10'];
  tipo: ExpenseType[] = [];
  usuario: InsertingUsers[] = [];

  constructor(
    private pS: ExpenseService,
    private gS: ExpenseTypeService,
    private uS: UserService,
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.gS.list().subscribe(data => {
      this.tipo = data;
    });
    this.uS.list().subscribe(data => {
      this.usuario = data;
    });
  }
  
  
  cargarProyectos() {
    this.pS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data
      }
    })
  }

  eliminar(id:number){
    this.pS.delete(id).subscribe(() => {
      this.cargarProyectos()
    })
  }

  getTipo(id: number): String {
    return (
      this.tipo.find(proy => proy.idExpenseType === id)
        ?.nameExpenseType || 'Sin tipo'
    );
  }

  getUsuario(id: number): string {
    return (
      this.usuario.find(proy => proy.idUser === id)
        ?.nameUser || 'Sin usuario'
    );
  }

}
