import { HomeComponent } from "./core/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "seg-operacao",
    loadChildren: "./modules/seg-operacao/seg-operacao.module#SegOperacaoModule"
  }
  // { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  // { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  // { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

  //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  // { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  // { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
