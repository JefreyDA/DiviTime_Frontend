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
import { Eventcomponent } from './components/eventcomponent/eventcomponent';
import { EventList } from './components/eventcomponent/event-list/event-list';
import { EventInsert } from './components/eventcomponent/event-insert/event-insert';
import { EventUpdate } from './components/eventcomponent/event-update/event-update';
import { Familycomponent } from './components/familycomponent/familycomponent';
import { FamilyList } from './components/familycomponent/family-list/family-list';
import { FamilyInsert } from './components/familycomponent/family-insert/family-insert';
import { FamilyUpdate } from './components/familycomponent/family-update/family-update';
import { Authenticate } from './components/authenticate/authenticate';
import { Home } from './components/home/home';

export const routes: Routes = [

   {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: Authenticate,
    },

    {
  path: 'homes',
  component: Home
},

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
  {
    path: 'events',
    component: Eventcomponent,
    children: [
      {
        path: 'list',
        component: EventList
      },
      {
        path: 'insert',
        component: EventInsert
      },
      {
        path: 'update/:id',
        component: EventUpdate
      }
    ]
  },
  {
    path: 'families',
    component: Familycomponent,
    children: [
      {
        path: 'list',
        component: FamilyList
      },
      {
        path: 'insert',
        component: FamilyInsert
      },
      {
        path: 'update/:id',
        component: FamilyUpdate
      }
    ]
  }
];
