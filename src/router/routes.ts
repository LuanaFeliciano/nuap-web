import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/Atend',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Atendimento.vue')}],
  },
  {
    path: '/agendEstagiario',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AgendamentoEstagiario.vue')}],
  },
  {
    path: '/AtendRetorno',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Retorno.vue')}],
  },
  {  path: '/cadastro',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/Cadastro.vue') }],
  },
  {  path: '/cadPaciente',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CadDetalhesAluno/CadPaciente.vue') }],
  },
  {
    path: '/agendamentos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Alunos.vue')}],
  },
  {
    path: '/primeiroAtend',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistAtendimento/PrimeiroAtendimento.vue')}],
  },
  {
    path: '/atendRotina',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistAtendimento/AtendimentoRotina.vue')}],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
