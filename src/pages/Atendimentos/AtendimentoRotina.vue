<template>
  <q-page >
    <!-- Form Section -->
    <div class="q-pa-lg">
      <q-card class="q-pa-lg">
        <div class="text-h3 q-mb-lg" align="center">Registro Documental - Retorno: </div>
        <div class="text-h6 q-mb-sm">Data: </div>
        <div class="text-h6 q-mb-sm">RA: </div>
        <div class="text-h6 q-mb-sm">Estagiário responsável pelo atendimento: </div>


        <q-form>
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-input type="textarea" outlined label="Verificação dos combinados anteriores" />
            </div>
            <div class="col-12 q-mb-md">
              <q-input type="textarea" outlined label="Relato do atendimento" />
            </div>

            <div class="col-12 q-mb-md">
              <div class="text-h7 q-mb-md">Estágio de mudança:</div>
              <q-option-group
                v-model="stage"
                :options="stageOptions"
                type="radio"
                inline
              />
            </div>

            <div class="col-12 q-mb-md">
              <q-input outlined label="Combinados" />
            </div>
            <div class="col-12 q-mb-md">
              <q-input outlined label="Observação" />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
    <div class="q-pl-xl q-mb-lg flex">
      <q-btn color="primary" label="Salvar" />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      stage: '',
      stageOptions: [
        { label: 'Pré-contemplação', value: 'pre' },
        { label: 'Contemplação', value: 'contemplation' },
        { label: 'Preparação', value: 'preparation' },
        { label: 'Ação', value: 'action' },
        { label: 'Manutenção', value: 'maintenance' },
        { label: 'Recaída', value: 'relapse' }
      ]
    }
  }
}
</script>

<style scoped>
.q-card {
  max-width: auto;
  margin: auto;
}
</style>
