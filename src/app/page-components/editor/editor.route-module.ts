import { Route, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EditorComponent } from './editor.component';

const routes: Routes = [
  { path: '', component: EditorComponent }
];

export const editorRoutes: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
