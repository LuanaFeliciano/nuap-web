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
        <q-chip outline color="white" class="q-ml-sm">Coordenador(a)</q-chip>
      </div>
    </q-bar>

    <div class="q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h3 text-center">Registro Documental - Retorno Número: </div>
          <div class="text-h6">Data: 01/01/0001 </div>
          <div class="text-h6">RA: 123456-7</div>
          <div class="text-h6 q-mb-lg">Termo: 5</div>

          <q-input
            v-model="verificacaoCombinados"
            label="Verificação dos combinados anteriores (Avaliação das ações, dificuldades encontradas, etc.)"
            type="textarea"
            filled
            class="q-mb-md"
          />

          <q-input class="q-mb-md" v-model="relato" label="Relato do atendimento" type="textarea" filled />

          <div class="q-gutter-md q-mt-md q-mb-md">
            <div class="text-subtitle1 q-mb-sm">Estágio de mudança:</div>
            <q-option-group v-model="estagioMudanca" :options="estagios" inline />
          </div>

          <q-input class="q-mb-md" v-model="combinados" label="Combinados" filled />
          <q-input class="q-mb-md" v-model="observacao" label="Observação" filled />
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
      verificacaoCombinados: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula elit, tincidunt ac vehicula non, cursus nec lectus. Proin enim elit, posuere a magna et, laoreet tincidunt lectus. Pellentesque pulvinar ligula at urna dapibus vulputate. Ut volutpat dui in lorem rhoncus, condimentum vestibulum nisl posuere. In interdum euismod venenatis. In hac habitasse platea dictumst. Maecenas id tincidunt quam. Donec cursus porttitor arcu in facilisis. Donec lectus nunc, vulputate ut risus sed, pretium faucibus nisi. Nam mollis massa a massa efficitur, sed pretium ipsum venenatis.'],
      relato: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula elit, tincidunt ac vehicula non, cursus nec lectus. Proin enim elit, posuere a magna et, laoreet tincidunt lectus. Pellentesque pulvinar ligula at urna dapibus vulputate. Ut volutpat dui in lorem rhoncus, condimentum vestibulum nisl posuere. In interdum euismod venenatis. In hac habitasse platea dictumst. Maecenas id tincidunt quam. Donec cursus porttitor arcu in facilisis. Donec lectus nunc, vulputate ut risus sed, pretium faucibus nisi. Nam mollis massa a massa efficitur, sed pretium ipsum venenatis.'],
      combinados: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula elit, tincidunt ac vehicula non, cursus nec lectus.'],
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
        const year = parseInt(dateParts[2], 10); // Leitura correta do ano

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
      const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // Ajuste para checar 4 dígitos para o ano
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
  max-height: 60px; /* Mantenha a mesma altura máxima da primeira logo */
}

.user-info {
  display: flex;
  align-items: center;
}

.q-btn {
  font-size: 16px;
}

.bg-primary {
  background-image: linear-gradient(#00ADEE, #19B1A4, #077157) !important;
}

/* Ajuste de largura para o campo de Data */
.input-date {
  max-width: 220px; /* Ajuste para caber DD/MM/AAAA */
}

/* Ajuste de largura para o campo de RA */
.input-ra {
  max-width: 180px; /* Ajuste para caber 8 números */
}
</style>
