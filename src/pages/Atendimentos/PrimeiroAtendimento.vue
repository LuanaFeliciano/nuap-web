<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Registro de Primeiro Atendimento</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <!-- Aluno -->
          <q-input v-model="form.aluno" label="Aluno" filled />

          <!-- Atendente -->
          <q-input v-model="form.atendente" label="Atendente" filled />

          <!-- Data -->
          <q-input v-model="form.data" label="Data" filled />

          <!-- Estagiário responsável pelo atendimento -->
          <q-input v-model="form.estagiario" label="Estagiário responsável pelo atendimento" filled />

          <!-- RA -->
          <q-input v-model="form.ra" label="RA" filled />

          <!-- Termo -->
          <q-input v-model="form.termo" label="Termo" filled />

          <!-- Constelação Familiar -->
          <q-input v-model="form.constelacaoFamiliar" label="Constelação Familiar" filled />

          <!-- Com quem reside -->
          <q-input v-model="form.comQuemReside" label="Com quem reside" filled />

          <!-- Rotina de vida e estudos -->
          <q-input v-model="form.rotinaVidaEstudos" label="Rotina de vida e estudos" filled />

          <!-- Relato do primeiro atendimento -->
          <q-input v-model="form.relato" label="Relato do primeiro atendimento" type="textarea" filled />

          <!-- Estágio de mudança -->
          <q-select
            v-model="form.estagioMudanca"
            :options="estagiosMudanca"
            label="Estágio de mudança"
            filled
          />

          <!-- Combinados -->
          <q-input v-model="form.combinados" label="Combinados" type="textarea" filled />

          <!-- Observação -->
          <q-input v-model="form.observacao" label="Observação" type="textarea" filled />

          <!-- Botões -->
          <q-btn label="Salvar" type="submit" color="primary" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        aluno: '',
        atendente: '',
        data: '',
        estagiario: '',
        ra: '',
        termo: '',
        constelacaoFamiliar: '',
        comQuemReside: '',
        rotinaVidaEstudos: '',
        relato: '',
        estagioMudanca: '',
        combinados: '',
        observacao: '',
      },
      estagiosMudanca: [
        'Pré-contemplação',
        'Contemplação',
        'Preparação',
        'Ação',
        'Manutenção',
        'Recaída',
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      // Aqui você pode fazer a lógica de envio para o backend
    },
  },
};
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
