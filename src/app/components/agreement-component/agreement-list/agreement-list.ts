import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Agreement } from '../../../models/Agreement';
import { AgreementService } from '../../../services/agreement-service';

@Component({
  selector: 'app-agreement-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './agreement-list.html',
  styleUrl: './agreement-list.css',
})
export class AgreementList implements OnInit {
  dataSource = new MatTableDataSource<Agreement>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  constructor(private aS: AgreementService) {}

  ngOnInit(): void {
    this.cargarAcuerdos();
  }

  cargarAcuerdos() {
    this.aS.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.cargarAcuerdos();
    });
  }
}