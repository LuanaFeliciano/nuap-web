<template>
  <q-page class="q-pa-md custom-form">
    <div class="content-wrapper">
    <q-tabs v-model="activeTab" class="text-teal" align="left" indicator-color="teal">
      <q-tab name="identificacao" label="Identificação e Contato" />
      <q-tab name="formacao" label="Formação Anterior e Profissional" />
      <q-tab name="universidade" label="Universidade e Vida Acadêmica" />
    </q-tabs>

    <q-separator />

    <div v-if="activeTab === 'identificacao'" class="form-section">
      <label class="section-label">Identificação</label>
      <q-form>
          <div class="form-row">
            <div class="form-column">
              <q-input class="custom-input" filled label="Nome" />
              <q-input class="custom-input" filled label="Curso" />
              <q-input class="custom-input" filled label="Idade" />
              <q-input class="custom-input" filled label="Telefone" />

              <div class="form-group">
                <label>Residência</label>
                <q-option-group class="custom-radio horizontal-group" :options="residenciaOptions" type="radio" inline v-model="residencia" />
                <q-input v-if="residencia === 'outro'" class="custom-input" filled label="Outra Residência" v-model="residenciaOutro"/>
              </div>

              <div class="form-group">
                <label>Locomoção</label>
                <q-option-group class="custom-radio horizontal-group" label="Locomoção" :options="locomocaoOptions" type="radio" inline v-model="locomocao" />
                <q-input v-if="locomocao === 'outro' "class="custom-input" filled label="teste" v-model="locomocaoOutro"/>
              </div>
            </div>

            <div class="form-column">
              <q-input class="custom-input" filled label="RA" />
              <q-input class="custom-input" filled label="Termo" />
              <q-input class="custom-input date-input" filled label="Data de Nascimento" type="date" />
              <q-input class="custom-input" filled label="Fixo ou Outro" />

              <div class="form-group">
                <label>Família Reside</label>
                <q-option-group class="custom-radio horizontal-group" :options="familiaOptions" type="radio" inline v-model="familia" />
                <q-input v-if="familia === 'outro'" class="custom-input" filled label="Outra Localidade da Família" v-model="familiaOutro"/>
              </div>
            </div>

            <div class="form-column">
              <div class="form-group">
                <label>Sexo</label>
                <q-option-group class="custom-radio horizontal-group" :options="sexOptions" type="radio" inline v-model="sexo" />
              </div>

              <div class="form-group">
                <label>Auxílio</label>
                <q-option-group class="custom-radio horizontal-group" :options="auxilioOptions" type="radio" inline v-model="auxilio" />
              </div>

              <div class="form-group">
                <label>Estado Civil</label>
                <q-option-group class="custom-radio horizontal-group" :options="estadoCivilOptions" type="radio" inline v-model="estadoCivil" />
              </div>
            </div>
          </div>
      </q-form>
    </div>

    <div v-if="activeTab === 'formacao'">
      <q-form>
        <div class="form-group">

          <!-- Input Ensino Médio Concluído no Ano -->
          <div class="form-row" style="display: flex; align-items: center;">
            <q-input class="custom-input" filled label="Ensino Médio Concluído" style="flex: 1;" />

            <div style="margin-left: 10px; display: flex; align-items: center;">
              <q-option-group
                label="Tipo de Escola" :options="escolaOptions" type="radio" v-model="escola" inline/>
            </div>
          </div>

          <label>Formação Anterior</label>

          <q-option-group class="custom-radio" :options="[{ label: 'Apenas Ensino Médio Completo', value: 'medioCompleto' }]" type="radio" v-model="formacaoAnterior" />
          <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px; margin-left: 10px;" />
          <!-- Opção Superior Incompleto com Inputs -->
          <div class="form-row" style="margin-top: 10px;">
            <q-option-group
              class="custom-radio"
              :options="[{ label: 'Superior Incompleto', value: 'superiorIncompleto' }]"
              type="radio"
              v-model="formacaoAnterior"
            />
            <q-input class="custom-input" filled label="Curso" style="width: 150px; margin-left: 10px;" />
            <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px; margin-left: 10px;" />
          </div>

          <!-- Opção Superior Completo -->
          <div class="form-row" style="margin-top: 10px;">
            <q-option-group
              class="custom-radio"
              :options="[{ label: 'Superior Completo', value: 'superiorCompleto' }]"
              type="radio"
              v-model="formacaoAnterior"
            />
          </div>
        </div>
      </q-form>
    </div>





    <div v-if="activeTab === 'universidade'">
      <q-form>
        <div class="q-gutter-md">
          <q-option-group
            label="Tempo Dedicado aos Estudos por Dia"
            :options="tempoEstudoOptions"
            type="radio"
            v-model="tempoEstudo"
          />
          <q-option-group
            label="Áreas a Ser Ajudado"
            :options="areasAjudadoOptions"
            type="checkbox"
            v-model="areasAjudado"
          />
        </div>
        <q-input
          filled
          class="custom-input" label="Explique com mais detalhes as áreas que assinalou acima"
          type="textarea"
        />
        <q-input
          filled
          class="custom-input" label="Como gostaria de ser ajudado?"
          type="textarea"
        />
        <q-option-group
            label="Como chegou ao NuAP"
            :options="chegouNuapOptions"
            type="radio"
            v-model="chegouNuap"
          />
      </q-form>
    </div>
  </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'identificacao',
      sexo: null,
      auxilio: null,
      estadoCivil: null,
      residencia: null,
      familia: null,
      locomocao: null,
      formacaoAnterior: null,
      profissao: null,
      tempoEstudo: null,
      areasAjudado: [],
      chegouNuap: null,

      residenciaOutro: '',
      familiaOutro: '',
      locomocaoOutro: '',

      sexOptions: [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
        { label: 'Outros', value: 'outros' }
      ],
      auxilioOptions: [
        { label: 'FIES', value: 'fies' },
        { label: 'PROUNI', value: 'prouni' },
        { label: 'Bolsa', value: 'bolsa' },
        { label: 'Sem Auxílio', value: 'semAuxilio' }
      ],
      estadoCivilOptions: [
        { label: 'Solteiro', value: 'solteiro' },
        { label: 'Casado', value: 'casado' },
        { label: 'União Estável', value: 'uniaoEstavel' },
        { label: 'Outro', value: 'outro' }
      ],
      residenciaOptions: [
        { label: 'Marilia', value: 'marilia' },
        { label: 'Outro', value: 'outro' },
      ],
      familiaOptions: [
        { label: 'Marilia', value: 'marilia' },
        { label: 'Outro', value: 'outro' },
      ],
      locomocaoOptions: [
        { label: 'Veiculo Proprio', value: 'veiculoProprio' },
        { label: 'Onibus Circular', value: 'onibusCircular' },
        { label: 'A Pé', value: 'aPé' },
        { label: 'Carona', value: 'carona' },
        { label: 'Onibus Intermunicipal', value: 'onibusIntermunicipal' },
        { label: 'Outro', value: 'outro' },
      ],
      formacaoAnteriorOptions: [
        { label: 'Ensino Médio Completo', value: 'medioCompleto' },
        { label: 'Superior Incompleto', value: 'superiorIncompleto' },
        { label: 'Superior Completo', value: 'superiorCompleto' },
        { label: 'Outro', value: 'outro' }
      ],
      escolaOptions: [
        { label: 'Escola Publica', value: 'publica' },
        { label: 'Escola Privada', value: 'privada' },
      ],
      profissaoOptions: [
        { label: 'Estudando Apenas', value: 'estudando' },
        { label: 'Autônomo', value: 'autonomo' },
        { label: 'Estágio Remunerado', value: 'estagio' },
        { label: 'Empregado', value: 'empregado' }
      ],
      tempoEstudoOptions: [
        { label: '< 30 minutos', value: '<30min' },
        { label: '± 30 minutos', value: '30min' },
        { label: 'Até 1 hora', value: '1hora' },
        { label: 'Até 2 horas', value: '2horas' },
        { label: 'Até 3 horas', value: '3horas' },
        { label: '> 3 horas', value: '>3horas' },
        { label: 'Somente Finais de Semana', value: 'finaisSemana' },
        { label: 'Somente Vésperas de Provas', value: 'vespera' }
      ],
      areasAjudadoOptions: [
        { label: 'Assimilação do Estudo', value: 'assimilacao' },
        { label: 'Interpretação e Redação de Conteúdo', value: 'interpretacao' },
        { label: 'Técnica de Estudo', value: 'tecnica' },
        { label: 'Relação Professor-Aluno', value: 'relacao' },
        { label: 'Relação com Colegas de Sala', value: 'relacaoColegas' },
        { label: 'Problemas Emocionais Pessoais', value: 'problemas' },
        { label: 'Conciliação das Exigencias Academicas e do Trabalho', value: 'conciliacao' },
        { label: 'Insuficiente Base de Conhecimentos do Ensino Medio', value: 'baseConhecimento' },
        { label: 'Insuficinte base de Conhecimentos das Disciplinas do Curso Atual', value: 'baseConhecimentoAtual' },
        { label: 'Outro', value: 'outro' },
      ],
      chegouNuapOptions: [
        { label: 'Livre Demanda', value: 'livre' },
        { label: 'Encaminhado por Coord/Prof', value: 'encaminhado' },
        { label: 'Setores Unimar', value: 'setores' },
      ],
    }
  }
}
</script>

<style scoped>
.custom-input {
  width: 400px;
  margin-bottom: 15px;
  border: 0.5px solid #0094A8;
  border-radius: 10px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom:10px;
}

.form-column {
  width: 30%;
}

.form-group label {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #00505B90;
}

.content-wrapper {
  background-color: #ffffff;
  padding: 1.5cm;
  margin: 1cm;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(99vh - 4cm);
  display: flex;
  flex-direction: column;
}

.section-label {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #00505B90;
}

.horizontal-group .q-option-group {
  display: flex;
}

.horizontal-group .q-option-group--inline .q-radio {
  margin-right: 15px;
  display: inline-flex;
  align-items: center;
}

.q-radio__inner {
  margin-right: 5px;
}

.custom-input input {
  border: 1px solid #0094A8;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  color: #333;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.custom-input label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.custom-radio .q-option-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.custom-radio label {
  font-size: 50px !important;
}

.custom-radio .q-radio__inner {
  border-color: #00897b;
}

.custom-radio .q-radio__bg {
  background-color: #00897b;
}

.q-gutter-md {
  margin-top: 15px;
}

.q-separator {
  margin: 20px 0;
}
</style>

