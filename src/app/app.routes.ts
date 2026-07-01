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

import { Chatcomponent } from './components/chatcomponent/chatcomponent';
import { ChatBot } from './components/chatcomponent/chat-bot/chat-bot';
import { ChatInsert } from './components/chatcomponent/chat-insert/chat-insert';
import { ChatList } from './components/chatcomponent/chat-list/chat-list';
import { AgreementTypeComponent } from './components/agreement-type-component/agreement-type-component';
import { AgreementTypeList } from './components/agreement-type-component/agreement-type-list/agreement-type-list';
import { AgreementTypeInsert } from './components/agreement-type-component/agreement-type-insert/agreement-type-insert';
import { AgreementTypeUpdate } from './components/agreement-type-component/agreement-type-update/agreement-type-update';
import { Expensecomponent } from './components/expensecomponent/expensecomponent';
import { ExpenseList } from './components/expensecomponent/expense-list/expense-list';
import { ExpenseInsert } from './components/expensecomponent/expense-insert/expense-insert';
import { ExpenseUpdate } from './components/expensecomponent/expense-update/expense-update';
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
    component: Home,
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
    path: 'expense',
    component: Expensecomponent,
    children: [
      {
        path: 'listar',
        component: ExpenseList,
      },
      {
        path: 'register',
        component: ExpenseInsert,
      },
      {
        path: 'edits/:id',
        component: ExpenseUpdate,
      },
    ],
  },
  
  {
    path: 'agreementtype',
    component: AgreementTypeComponent,
    children: [
      {
        path: 'list',
        component: AgreementTypeList,
      },
      {
        path: 'register',
        component: AgreementTypeInsert,
      },
      {
        path: 'update/:id',
        component: AgreementTypeUpdate,
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
      },
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
        component: EventList,
      },
      {
        path: 'insert',
        component: EventInsert,
      },
      {
        path: 'update/:id',
        component: EventUpdate,
      },
    ],
  },
  {
    path: 'chats',
    component: Chatcomponent,
    children: [
      {
        path: 'insert',
        component: ChatInsert,
      },
      {
        path: 'list',
        component: ChatList,
      },
      {
        path: 'bot/:idChat',
        component: ChatBot,
      },
    ],
  },
];
