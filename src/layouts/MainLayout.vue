<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-bar class="bg-primary text-white q-pa-md header-bar">
      <q-img src="/src/assets/LogoNuAP.png" class="q-mr-md logo-img" width="120px" />
      <q-btn flat label="Aluno" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-btn flat label="teste" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-btn flat label="teste" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-btn flat label="teste" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-space />
      <div class="user-info q-gutter-xs">
        <q-avatar size="40px" class="q-ml-md">
          <q-icon name="person" />
        </q-avatar>
        <div class="q-ml-sm">{{ nome }}</div>
        <q-chip outline color="white" class="q-ml-sm">{{ tipo }}</q-chip>
      </div>
    </q-bar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

defineOptions({
  name: 'MainLayout'
});

let nome = localStorage.getItem('nome');
let tipo = localStorage.getItem('tipo');
</script>



<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  height: 80px;
}

.logo-img {
  max-height: 60px;
}

.user-info {
  display: flex;
  align-items: center;
}

.student-table {
  margin-top: 10px;
}

.d-flex {
  display: flex;
  align-items: center; /* Alinhamento vertical */
}

</style>
