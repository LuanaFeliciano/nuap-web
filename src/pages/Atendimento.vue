<template>
  <q-page padding>
    <q-bar class="bg-primary text-white q-pa-md header-bar">
      <q-img src="/src/assets/LogoNuAP.png" class="q-mr-md logo-img" width="100px" />
      <q-btn flat label="Aluno" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-btn flat label="teste" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-btn flat label="teste" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-btn flat label="teste" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-btn flat label="teste" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
      <q-space />
      <div class="user-info q-gutter-xs">
        <q-avatar size="40px" class="q-ml-md">
          <q-icon name="person" />
        </q-avatar>
        <div class="q-ml-sm">Cristovam</div>
        <q-chip outline color="white" class="q-ml-sm">Atendente</q-chip>
      </div>
    </q-bar>

    <div class="q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-center">Registro de Primeiro Atendimento</div>


          <q-input
            v-model="data"
            label="Data (DD/MM/YY)"
            class="q-mb-md"
            :rules="['date']"
            @blur="validateDate"
          />

          <q-input v-model="ra" label="RA" class="q-mb-md" />
          <q-input v-model="termo" label="Termo" class="q-mb-md" />
          <q-input v-model="constelacaoFamiliar" label="Constelação Familiar" filled />
          <q-input v-model="residencia" label="Com quem reside" filled />
          <q-input v-model="rotina" label="Rotina de vida e estudos" filled />
          <q-input v-model="relato" label="Relato do primeiro atendimento" type="textarea" filled />

          <div class="q-gutter-md">
            <div class="text-subtitle1 q-mb-sm">Estágio de mudança:</div>
            <q-option-group v-model="estagioMudanca" :options="estagios" inline />
          </div>

          <q-input v-model="combinados" label="Combinados" filled />
          <q-input v-model="observacao" label="Observação" filled />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      ra: '',
      termo: '',
      constelacaoFamiliar: '',
      residencia: '',
      rotina: '',
      relato: '',
      combinados: '',
      observacao: '',
      estagioMudanca: '',
      estagios: [
        { label: 'Pré-contemplação', value: 'pre-contemplacao' },
        { label: 'Contemplação', value: 'contemplacao' },
        { label: 'Preparação', value: 'preparacao' },
        { label: 'Ação', value: 'acao' },
        { label: 'Manutenção', value: 'manutencao' },
        { label: 'Recaída', value: 'recaida' }
      ]
    };
  },
  methods: {
    validateDate() {
      const dateParts = this.data.split('/');
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Meses em JS começam do 0
        const year = parseInt(dateParts[2], 10) + 2000; // Considerando ano de 2000+

        const date = new Date(year, month, day);
        if (
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
        ) {

          console.log("Data válida:", date);
        } else {

          this.data = ''; // Reseta campo em caso de data inválida
          console.error("Data inválida");
        }
      }
    }
  }
};
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

.q-btn {
  min-height: 40px;
  font-size: 16px;
  margin-right: 10px;
}
.bg-primary {
  background-image: linear-gradient(#00ADEE,#19B1A4, #077157) !important;
}

</style>
