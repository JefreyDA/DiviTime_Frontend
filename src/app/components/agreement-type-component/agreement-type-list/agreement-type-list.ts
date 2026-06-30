import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { AgreementType } from '../../../models/agreement-type';
import { AgreementTypeService } from '../../../services/agreement-type-service';

@Component({
  selector: 'app-agreement-type-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './agreement-type-list.html',
  styleUrl: './agreement-type-list.css',
})
export class AgreementTypeList implements OnInit {

  dataSource = new MatTableDataSource<AgreementType>();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private aTS: AgreementTypeService) {}

  ngOnInit(): void {
    this.cargarAgreementTypes();
  }

  cargarAgreementTypes() {
    this.aTS.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    this.aTS.delete(id).subscribe(() => {
      this.cargarAgreementTypes();
    });
  }
}