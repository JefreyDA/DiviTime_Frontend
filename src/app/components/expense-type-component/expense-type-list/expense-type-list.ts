import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ExpenseType } from '../../../models/ExpenseType';
import { ExpenseTypeService } from '../../../services/expense-type-service';

@Component({
  selector: 'app-expense-type-list',
  imports: [MatTableModule, MatIcon, MatButtonModule, RouterLink],
  templateUrl: './expense-type-list.html',
  styleUrl: './expense-type-list.css',
})
export class ExpenseTypeList implements OnInit{
  dataSource: MatTableDataSource<ExpenseType> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5'];

  constructor(private pS: ExpenseTypeService) { }

  ngOnInit(): void {
    this.cargarProyectos()
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

}
