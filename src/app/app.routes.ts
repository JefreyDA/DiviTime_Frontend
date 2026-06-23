import { Routes } from '@angular/router';

import { ExpenseTypeComponent } from './components/expense-type-component/expense-type-component';
import { ExpenseTypeList } from './components/expense-type-component/expense-type-list/expense-type-list';
import { ExpenseTypeInsert } from './components/expense-type-component/expense-type-insert/expense-type-insert';
import { ExpenseTypeUpdate } from './components/expense-type-component/expense-type-update/expense-type-update';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolList } from './components/rolcomponent/rol-list/rol-list';
import { UserComponent } from './components/user-component/user-component';
import { UserList } from './components/user-component/user-list/user-list';
import { UserInsert } from './components/user-component/user-insert/user-insert';

export const routes: Routes = [
  {
    path: 'expensestype',
    component: ExpenseTypeComponent,
    children: [
      {
        path: 'listar',
        component: ExpenseTypeList,
      },
      {
        path: 'register',
        component: ExpenseTypeInsert,
      },
      {
        path: 'edits/:id',
        component: ExpenseTypeUpdate,
      },
    ],
  },
  {
    path: `role`,
    component: Rolcomponent,
    children: [
      {
        path: `list`,
        component: RolList,
      },
    ],
  },
  {
    path: `users`,
    component: UserComponent,
    children: [
      {
        path: `list`,
        component: UserList,
      },
      {
        path: `insert`,
        component: UserInsert,
      }
      //{
        //path: 'edits/:email',
        //component: UserUpdate,
      //},
    ],
  },
];
