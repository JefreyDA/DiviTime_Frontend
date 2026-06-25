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
import { Chatcomponent } from './components/chatcomponent/chatcomponent';
import { ChatInsert } from './components/chatcomponent/chat-insert/chat-insert';
import { ChatList } from './components/chatcomponent/chat-list/chat-list';

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
    path: 'chats',
    component: Chatcomponent,
    children: [
      {
        path:'list',
        component: ChatList
      },
      {
        path: 'insert',
        component: ChatInsert
      }
    ]
  }
];
