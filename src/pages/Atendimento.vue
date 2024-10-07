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
            label="Data (Dia/Mês/Ano)"
            class="q-mb-md input-date"
            mask="##/##/####"
            :rules="[validaData]"
            @blur="validateDate"
            filled
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" @click="openDatePicker">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="data" mask="DD/MM/YYYY" @input="formatDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-model="ra"
            label="RA"
            class="q-mb-md input-ra"
            mask="############"
            filled
          />

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
        const year = parseInt(dateParts[2], 10);

        const date = new Date(year, month, day);
        if (
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
        ) {
          console.log("Data válida:", date);
        } else {
          console.error("Data inválida");
        }
      }
    },
    validaData(val) {
      const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (!val.match(regex)) {
        return 'Data inválida. Use o formato DD/MM/AAAA';
      }
      return true;
    },
    openDatePicker() {
      // Método para abrir o date picker, se necessário.
    },
    formatDate(date) {
      // Atualiza a data no formato correto
      this.data = date;
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

/* Ajuste de largura para o campo de Data */
.input-date {
  max-width: 220px; /* Ajuste para caber DD/MM/AAAA */
}

/* Ajuste de largura para o campo de RA */
.input-ra {
  max-width: 180px; /* Ajuste para caber 12 números */
}
</style>
