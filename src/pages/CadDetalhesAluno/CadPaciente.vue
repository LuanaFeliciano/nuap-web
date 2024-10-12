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
              <q-input class="custom-input" filled label="Idade" v-model="idade" mask="##"/>
              <q-input class="custom-input" filled label="Telefone" v-model="telefone" mask="(##) #####-####"/>

              <div class="form-group">
                <label>Residência</label>
                <q-option-group class="custom-radio horizontal-group" :options="residenciaOptions" type="radio" inline v-model="residencia" @input="handleResidenciaChange"/>
                <q-input v-if="residencia === 'Outro'" class="custom-input" filled label="Outra Residência" v-model="outraCidade" @input="atualizarResidenciaRevisao"/>
              </div>

              <div class="form-group">
                <label>Locomoção</label>
                <q-option-group class="custom-radio horizontal-group" label="Locomoção" :options="locomocaoOptions" type="radio" inline v-model="locomocao" @input="handleLocomocaoChange"/>
                <q-input v-if="locomocao === 'Outro'" class="custom-input" filled label="Outra Locomoção" v-model="outraLocomocao" @input="atualizarLocomocaoRevisao"/>
              </div>
            </div>

            <div class="form-column">
              <q-input class="custom-input" filled label="RA" v-model="ra" mask="######-#"/>
              <q-input class="custom-input" filled label="Termo" v-model="termo"/>
              <q-input class="custom-input date-input" filled label="Data de Nascimento" type="date" v-model="dataNascimento"/>
              <q-input class="custom-input" filled label="Fixo ou Outro" v-model="fixo" mask="(##) ####-####)"/>

              <div class="form-group">
                <label>Família Reside</label>
                <q-option-group class="custom-radio horizontal-group" :options="familiaOptions" type="radio" inline v-model="familia"  @input="handleFamiliaResideChange"/>
                <q-input v-if="familia === 'Outro'" class="custom-input" filled label="Outra Localidade da Família" v-model="outraFamiliaReside" @input="atualizarFamiliaResideRevisao"/>
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
            <q-input class="custom-input" filled v-model="ensinoMedioAno" mask="####"/>

            <div style="margin-right: 35%;">
              <q-option-group label="Tipo de Escola" :options="escolaOptions" type="radio" v-model="escola" inline />
            </div>
          </div>
        </div>

        <div class="form-group">
            <label>Formação Anterior</label>
            <div class="form-row2">
              <q-option-group class="custom-radio" style="margin-bottom: 17px ;"  :options="[{ label: 'Apenas Ensino Médio Completo', value: 'Apenas Ensino Médio Completo' }]" type="radio" v-model="formacaoAnterior" @change="clearCursoAno"/>
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Superior Incompleto', value: 'Superior Incompleto' }]" type="radio" v-model="formacaoAnterior" style="margin-right: 100px;" @change="clearCursoAno"/>
              <q-input class="custom-input" filled label="Curso" style="width: 500px; margin-right: 186px;" v-model="cursoAnterior" :disabled="!isSuperiorIncompletoSelected"/>
              <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px;" v-model="ano" mask="####" :disabled="!isSuperiorIncompletoSelected"/>
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Superior Completo', value: 'Superior Completo' }]" type="radio" v-model="formacaoAnterior" style="margin-right: 110px;" @change="clearCursoAno"/>
              <q-input class="custom-input" filled label="Curso" style="width: 500px; margin-right: 186px;" v-model="cursoAnterior" :disabled="!isSuperiorCompletoSelected"/>
              <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px;" v-model="ano" mask="####" :disabled="!isSuperiorCompletoSelected"/>
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Outro', value: 'Outro' }]" type="radio" v-model="formacaoAnterior" style="margin-right: 186px;" @change="clearCursoAno"/>
              <q-input class="custom-input" filled label="Curso" style="width: 500px; margin-right: 186px;" v-model="cursoAnterior" :disabled="!isOutroSelected"/>
              <q-input class="custom-input" filled label="Ano" type="number" style="width: 100px;" v-model="ano" mask="####" :disabled="!isOutroSelected"/>
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
              <q-input class="custom-input" filled label="C/H Semanal" style="width: 200px;" mask="##"/>
            </div>

            <div class="form-row2">
              <q-option-group class="custom-radio" :options="[{ label: 'Empregado', value: 'Empregado' }]" type="radio" v-model="profissao" style="margin-right: 166px;"/>
              <q-input class="custom-input" filled label="Cargo" style="width: 500px; margin-right: 186px;" />
              <q-input class="custom-input" filled label="C/H Semanal" style="width: 200px;" mask="##"/>
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
              <p><strong> Nome: </strong> {{ nome }}</p>
              <p><strong>Idade: </strong> {{ idade }}</p>
              <p><strong>Sexo: </strong> {{ sexo }}</p>
              <p><strong>Data de Nascimento: </strong> {{ dataNascimento }}</p>
              <p><strong>RA: </strong> {{ ra }}</p>
              <p><strong>Telefone: </strong> {{ telefone }}</p>
              <p><strong>Residência: </strong> {{ residenciaRevisao  }}</p>
              <p><strong>Locomoção: </strong> {{ locomocaoRevisao  }}</p>
              <p><strong>Família Reside: </strong> {{ familiaResideRevisao  }}</p>
              <p><strong>Estado Civil: </strong> {{ estadoCivil }}</p>
              <p><strong>Curso: </strong> {{ curso }}</p>
              <p><strong>Termo: </strong> {{ termo }}</p>
              <p><strong>Auxilio: </strong> {{ auxilio }}</p>

            </div>
            <div class="form-column">
              <h4>Formação</h4>
              <p><strong>Ensino Médio Concluído em: </strong> {{ ensinoMedioAno }}</p>
              <p><strong>Tipo de Escola: </strong> {{ escola }}</p>
              <p><strong>Formação Anterior: </strong> {{ formacaoAnterior }}</p>
              <p><strong>Ano: </strong> {{ ano }}</p>
              <p><strong>Profissão: </strong> {{ profissao }}</p>
              <p><strong>Cargo: </strong> {{ cargo }}</p>
              <p><strong>Carga Horaria: </strong> {{  }}</p>
            </div>


            <div class="form-column">
              <h4>Universidade</h4>
              <p><strong>Tempo Dedicado aos Estudos: </strong> {{ tempoEstudo }}</p>
              <p><strong>Áreas a Ser Ajudado: </strong> {{ areasAjudado }}</p>
              <p><strong>Destalhes das Áreas Escolhidas: </strong> {{ areasASerAjudado }}</p>
              <p><strong>Como Gostaria de Ser Ajudado: </strong> {{ comoGostariaAjudado }}</p>
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
      activeTab: 'identificacao',
      // Dados da Identificação
      nome: '',
      curso: '',
      idade: '',
      telefone: '',

      residencia: '',
      outraCidade: '',
      residenciaRevisao: '',

      locomocao: '',
      outraLocomocao: '',
      locomocaoRevisao: '',

      ra: '',
      termo: '',
      dataNascimento: '',
      fixo: '',

      familia: '',
      outraFamiliaReside: '',
      familiaResideRevisao: '',

      sexo: '',
      auxilio: '',
      estadoCivil: '',

      // Dados da Formação
      ensinoMedioAno: '',
      escola: '',

      formacaoAnterior: null,
      cursoAnterior: '',
      ano: '',

      profissao: '',

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
  },

  computed: {
    isSuperiorIncompletoSelected() {
      console.log('Checking Superior Incompleto:', this.formacaoAnterior);
      return this.formacaoAnterior === 'Superior Incompleto';
    },
    isSuperiorCompletoSelected() {
      return this.formacaoAnterior === 'Superior Completo';
    },
    isOutroSelected() {
      return this.formacaoAnterior === 'Outro';
    }
  },

  methods: {
    handleResidenciaChange() {
      if (this.residencia !== 'Outro') {
        this.outraCidade = '';
      }
    },

    handleLocomocaoChange() {
      if (this.locomocao !== 'Outro') {
        this.outraLocomocao = '';
      }
    },

    handleFamiliaResideChange() {
      if (this.familiaReside !== 'Outro') {
        this.outraFamiliaReside = '';
      }
    },


    atualizarResidenciaRevisao() {
      this.residenciaRevisao = this.residencia === 'Outro' && this.outraCidade ? this.outraCidade : this.residencia;
    },
    atualizarLocomocaoRevisao() {
      this.locomocaoRevisao = this.locomocao === 'Outro' && this.outraLocomocao ? this.outraLocomocao : this.locomocao;
    },
    atualizarFamiliaResideRevisao() {
      this.familiaResideRevisao = this.familia === 'Outro' && this.outraFamiliaReside ? this.outraFamiliaReside : this.familia;
    },

    clearCursoAno() {
      console.log('clearCursoAno called');
      this.cursoAnterior = '';
      this.ano = '';
    }
  },

  watch: {
    residencia(newVal) {
      this.atualizarResidenciaRevisao();
    },
    outraCidade(newVal) {
      if (this.residencia === 'Outro') {
        this.atualizarResidenciaRevisao();
      }
    },

    locomocao(newVal) {
      this.atualizarLocomocaoRevisao();
    },
    outraLocomocao(newVal) {
      if (this.locomocao === 'Outro') {
        this.atualizarLocomocaoRevisao();
      }
    },

    familia(newVal) {
      this.atualizarFamiliaResideRevisao();
    },
    outraFamiliaReside(newVal) {
      if (this.familia === 'Outro') {
        this.atualizarFamiliaResideRevisao();
      }
    },
  },


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
  color: #00505B90;
  text-transform: capitalize;
}

h4 {
  color: #00505B;
}

.q-btn {
  width: 200px;
  font-size: 18px;
}
</style>

