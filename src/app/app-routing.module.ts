import { RouterModule } from '@angular/router';

export const appRoutes = RouterModule.forRoot([{
  path: '',
  pathMatch: 'full',
  redirectTo: 'editor'
}, {
  path: 'editor',
  loadChildren: './page-components/editor/editor.module#EditorModule'
}]);
