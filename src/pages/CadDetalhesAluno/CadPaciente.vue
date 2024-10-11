<template>
  <q-page class="q-pa-md custom-form">
    <div class="content-wrapper">
    <q-tabs v-model="activeTab" class="text-teal" align="left" indicator-color="teal">
      <q-tab name="identificacao" label="Identificação e Contato" />
      <q-tab name="formacao" label="Formação Anterior e Profissional" />
      <q-tab name="universidade" label="Universidade e Vida Acadêmica" />
      <q-tab name="revisao" label="Revisar e Finalizar" />
    </q-tabs>

    <q-separator />

    <div v-if="activeTab === 'identificacao'" class="form-section">
      <label class="section-label">Identificação</label>
      <q-form>
          <div class="form-row">
            <div class="form-column">
              <q-input class="custom-input" filled label="Nome" v-model="nome"/>
              <q-input class="custom-input" filled label="Curso" v-model="curso"/>
              <q-input class="custom-input" filled label="Idade" v-model="idade"/>
              <q-input class="custom-input" filled label="Telefone" v-model="telefone"/>

              <div class="form-group">
                <label>Residência</label>
                <q-option-group class="custom-radio horizontal-group" :options="residenciaOptions" type="radio" inline v-model="residencia" />
                <q-input v-if="residencia === 'Outro'" class="custom-input" filled label="Outra Residência" v-model="residenciaOutro"/>
              </div>

              <div class="form-group">
                <label>Locomoção</label>
                <q-option-group class="custom-radio horizontal-group" label="Locomoção" :options="locomocaoOptions" type="radio" inline v-model="locomocao" />
                <q-input v-if="locomocao === 'Outro'" class="custom-input" filled label="Outra Locomoção" v-model="locomocaoOutro"/>
              </div>
            </div>

            <div class="form-column">
              <q-input class="custom-input" filled label="RA" v-model="ra"/>
              <q-input class="custom-input" filled label="Termo" v-model="termo"/>
              <q-input class="custom-input date-input" filled label="Data de Nascimento" type="date" v-model="dataNascimento"/>
              <q-input class="custom-input" filled label="Fixo ou Outro" v-model="fixo"/>

              <div class="form-group">
                <label>Família Reside</label>
                <q-option-group class="custom-radio horizontal-group" :options="familiaOptions" type="radio" inline v-model="familia" />
                <q-input v-if="familia === 'Outro'" class="custom-input" filled label="Outra Localidade da Família" v-model="familiaOutro"/>
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
          <div class="form-row" >
            <label>Ensino Medio Concluido em: </label>
            <q-input class="custom-input" filled v-model="ensinoMedioAno"/>

            <div style="margin-right: 35%;">
              <q-option-group label="Tipo de Escola" :options="escolaOptions" type="radio" v-model="escola" inline />
            </div>
          </div>
        </div>

        <div class="form-group">
            <label>Formação Anterior</label>
            <div class="form-row2">
              <q-option-group class="custom-radio" style="margin-bottom: 17px ;"  :options="[{ label: 'Apenas Ensino Médio Completo', value: 'Apenas Ensino Médio Completo' }]" type="radio" v-model="formacaoAnterior" />
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Superior Incompleto', value: 'Superior Incompleto' }]" type="radio" v-model="formacaoAnterior" style="margin-right: 100px;"/>
              <q-input class="custom-input" filled label="Curso" style="width: 500px; margin-right: 186px;" v-model="cursoAnterior"/>
              <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px;" v-model="ano"/>
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Superior Completo', value: 'Superior Completo' }]" type="radio" v-model="formacaoAnterior" style="margin-right: 110px;"/>
              <q-input class="custom-input" filled label="Curso" style="width: 500px; margin-right: 186px;" v-model="cursoAnterior"/>
              <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px;" v-model="ano"/>
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Outro', value: 'Outro' }]" type="radio" v-model="formacaoAnterior" style="margin-right: 186px;"/>
              <q-input class="custom-input" filled label="Curso" style="width: 500px; margin-right: 186px;" v-model="cursoAnterior"/>
              <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px;" v-model="ano"/>
            </div>
          </div>


          <div class="form-group">
            <label>Profissão</label>
            <div class="form-row2">
              <q-option-group class="custom-radio" style="margin-bottom: 17px ;"  :options="[{ label: 'Estudando Apenas', value: 'Estudando Apenas' }]" type="radio" v-model="profissao" />
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" style="margin-bottom: 17px ;" :options="[{ label: 'Autonomo', value: 'Autonomo' }]" type="radio" v-model="profissao" />
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Estágio Remunerado', value: 'Estágio Remunerado' }]" type="radio" v-model="profissao" style="margin-right: 110px;"/>
              <q-input class="custom-input" filled label="Local" style="width: 500px; margin-right: 186px;" />
              <q-input class="custom-input" filled label="C/H Semanal" style="width: 200px;" />
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Empregado', value: 'Empregado' }]" type="radio" v-model="profissao" style="margin-right: 166px;"/>
              <q-input class="custom-input" filled label="Cargo" style="width: 500px; margin-right: 186px;" />
              <q-input class="custom-input" filled label="C/H Semanal" style="width: 200px;" />
            </div>
          </div>

      </q-form>
    </div>





    <div v-if="activeTab === 'universidade'">
      <q-form>
        <div class="form-group">
          <div class="form-row" >
            <label>Tempo Dedicado aos Estudos por Dia</label>
          </div>

            <div class="form-row2">
              <q-option-group class="custom-radio horizontal-group" :options="tempoEstudoOptions" type="radio" inline v-model="tempoEstudo"/>
            </div>
            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Somente Finais de Semana', value: 'Somente Finais de Semana' }]" type="radio" v-model="tempoEstudo" style="margin-right: 40px;"/>
              <q-input class="custom-input" filled label="Tempo" style="width: 100px;" />

              <q-option-group class="custom-radio" :options="[{ label: 'Somente Vésperas de Provas', value: 'Somente Vésperas de Provas' }]" type="radio" v-model="tempoEstudo" style="margin-right: 40px; margin-left: 125px;"/>
              <q-input class="custom-input" filled label="Tempo" style="width: 100px;" />
            </div>

          <div class="form-row" >
            <label>Área a ser Ajudado</label>
          </div>

          <div class="form-row2">
            <q-option-group label="Áreas a Ser Ajudado" :options="areasAjudadoOptions" type="checkbox" v-model="areasAjudado"/>
          </div>

          <div class="form-row2">
            <q-input filled class="custom-input" label="Explique com mais detalhes as áreas que assinalou acima" type="textarea" v-model="areasASerAjudado"/>
          </div>

          <div class="form-row2">
            <q-input filled class="custom-input" label="Como gostaria de ser ajudado?" type="textarea" v-model="comoGostariaAjudado"/>
          </div>


          <div class="form-row" >
            <label>Como Chegou ao NuAP?</label>
          </div>

          <div class="form-row2">
            <q-option-group class="custom-radio horizontal-group" inline label="Como chegou ao NuAP" :options="chegouNuapOptions" type="radio" v-model="chegouNuap" />
          </div>

        </div>
      </q-form>
    </div>

    <div v-if="activeTab === 'revisao'">
      <q-form>
        <div class="q-gutter-md">
          <div class="form-row">
            <div class="form-column">
              <h4>Identificação</h4>
              <p>Nome: {{ nome }}</p>
              <p>Idade: {{ idade }}</p>
              <p>Sexo: {{ sexo }}</p>
              <p>Data de Nascimento: {{ dataNascimento }}</p>
              <p>RA: {{ ra }}</p>
              <p>Telefone: {{ telefone }}</p>
              <p>Residência: {{ residencia }}</p>
              <p>Residência Outro: {{ residenciaOutro }}</p>
              <p>Locomoção: {{ locomocao }}</p>
              <p>Família Reside: {{ familia }}</p>
              <p>Estado Civil: {{ estadoCivil }}</p>
              <p>Curso: {{ curso }}</p>
              <p>Termo: {{ termo }}</p>
              <p>Auxilio: {{ auxilio }}</p>

            </div>
            <div class="form-column">
              <h4>Formação</h4>
              <p>Ensino Médio Concluído em: {{ ensinoMedioAno }}</p>
              <p>Tipo de Escola: {{ escola }}</p>
              <p>Formação Anterior: {{ formacaoAnterior }}</p>
              <p>Profissão: {{ profissao }}</p>
            </div>


            <div class="form-column">
              <h4>Universidade</h4>
              <p>Tempo Dedicado aos Estudos: {{ tempoEstudo }}</p>
              <p>Áreas a Ser Ajudado: {{ areasAjudado }}</p>
              <p>Destalhes das Áreas Escolhidas: {{ areasASerAjudado }}</p>
              <p>Como Gostaria de Ser Ajudado: {{ comoGostariaAjudado }}</p>
            </div>
          </div>
        </div>

        <q-btn label="Cadastrar" color="teal" @click="cadastrar" />
      </q-form>
    </div>

  </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      // activeTab: 'identificacao',
      // sexo: null,
      // auxilio: null,
      // estadoCivil: null,
      // residencia: null,
      // familia: null,
      // locomocao: null,
      // formacaoAnterior: null,
      // profissao: null,
      // tempoEstudo: null,
      // areasAjudado: [],
      // chegouNuap: null,

      // residenciaOutro: '',
      // familiaOutro: '',
      // locomocaoOutro: '',

      activeTab: 'identificacao',
      // Dados da Identificação
      nome: '',
      curso: '',
      idade: '',
      telefone: '',

      residencia: null,
      residenciaOutro: '',

      locomocao: null,
      locomocaoOutro: '',

      ra: '',
      termo: '',
      dataNascimento: '',
      fixo: '',

      familia: '',
      familiaOutro: '',

      sexo: '',
      auxilio: '',
      estadoCivil: '',

      // Dados da Formação
      ensinoMedioAno: '',
      escola: null,
      formacaoAnterior: null,
      cursoAnterior: '',
      ano: '',
      profissao: null,

      // Dados da Universidade
      tempoEstudo: null,
      areasAjudado: [],
      comoGostariaAjudado: '',
      areasASerAjudado: '',

      sexOptions: [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Feminino', value: 'Feminino' },
        { label: 'Outros', value: 'Outros' }
      ],
      auxilioOptions: [
        { label: 'FIES', value: 'FIES' },
        { label: 'PROUNI', value: 'PROUNI' },
        { label: 'Bolsa', value: 'Bolsa' },
        { label: 'Sem Auxílio', value: 'Sem Auxílio' }
      ],
      estadoCivilOptions: [
        { label: 'Solteiro', value: 'Solteiro' },
        { label: 'Casado', value: 'Casado' },
        { label: 'União Estável', value: 'União Estável' },
        { label: 'Outro', value: 'Outro' }
      ],
      residenciaOptions: [
        { label: 'Marilia', value: 'Marilia' },
        { label: 'Outro', value: 'Outro' },
      ],
      familiaOptions: [
        { label: 'Marilia', value: 'Marilia' },
        { label: 'Outro', value: 'Outro' },
      ],
      locomocaoOptions: [
        { label: 'Veiculo Proprio', value: 'Veiculo Proprio' },
        { label: 'Onibus Circular', value: 'Onibus Circular' },
        { label: 'A Pé', value: 'A Pé' },
        { label: 'Carona', value: 'Carona' },
        { label: 'Onibus Intermunicipal', value: 'Onibus Intermunicipal' },
        { label: 'Outro', value: 'Outro' },
      ],
      formacaoAnteriorOptions: [
        { label: 'Ensino Médio Completo', value: 'Ensino Médio Completo' },
        { label: 'Superior Incompleto', value: 'Superior Incompleto' },
        { label: 'Superior Completo', value: 'Superior Completo' },
        { label: 'Outro', value: 'Outro' }
      ],
      escolaOptions: [
        { label: 'Escola Publica', value: 'Escola Publica' },
        { label: 'Escola Privada', value: 'Escola Privada' },
      ],
      profissaoOptions: [
        { label: 'Estudando Apenas', value: 'Estudando Apenas' },
        { label: 'Autônomo', value: 'Autônomo' },
        { label: 'Estágio Remunerado', value: 'Estágio Remunerado' },
        { label: 'Empregado', value: 'Empregado' }
      ],
      tempoEstudoOptions: [
        { label: '< 30 minutos', value: '< 30 minutos' },
        { label: '± 30 minutos', value: '± 30 minutos' },
        { label: 'Até 1 hora', value: 'Até 1 hora' },
        { label: 'Até 2 horas', value: 'Até 2 horas' },
        { label: 'Até 3 horas', value: 'Até 3 horas' },
        { label: '> 3 horas', value: '> 3 horas' },
        { label: 'Somente Finais de Semana', value: 'Somente Finais de Semana' },
        { label: 'Somente Vésperas de Provas', value: 'Somente Vésperas de Provas' }
      ],
      areasAjudadoOptions: [
        { label: 'Assimilação do Estudo', value: 'Assimilação do Estudo' },
        { label: 'Interpretação e Redação de Conteúdo', value: 'Interpretação e Redação de Conteúdo' },
        { label: 'Técnica de Estudo', value: 'Técnica de Estudo' },
        { label: 'Relação Professor-Aluno', value: 'Relação Professor-Aluno' },
        { label: 'Relação com Colegas de Sala', value: 'Relação com Colegas de Sala' },
        { label: 'Problemas Emocionais Pessoais', value: 'Problemas Emocionais Pessoais' },
        { label: 'Conciliação das Exigencias Academicas e do Trabalho', value: 'Conciliação das Exigencias Academicas e do Trabalho' },
        { label: 'Insuficiente Base de Conhecimentos do Ensino Medio', value: 'Insuficiente Base de Conhecimentos do Ensino Medio' },
        { label: 'Insuficinte base de Conhecimentos das Disciplinas do Curso Atual', value: 'Insuficinte base de Conhecimentos das Disciplinas do Curso Atual' },
        { label: 'Outro', value: 'Outro' },
      ],
      chegouNuapOptions: [
        { label: 'Livre Demanda', value: 'Livre Demanda' },
        { label: 'Encaminhado por Coord/Prof', value: 'Encaminhado por Coord/Prof' },
        { label: 'Setores Unimar', value: 'Setores Unimar' },
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

.form-row2 {
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
  margin-top: 15px;
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

p {
  font-size: 20px;
  color: #555;
  text-transform: capitalize;
}

.q-btn {
  width: 200px;
  font-size: 18px;
}
</style>

