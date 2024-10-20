<template>
  <q-page padding>
    <div class="q-pa-md">
      <!-- Campo de pesquisa -->
      <div class="q-pb-md">
        <q-input
          v-model="searchRA"
          label="Pesquisar pelo RA"
          outlined
          class="q-mb-md"
          :rules="[val => (val === '' || /^\d+$/.test(val) || 'Apenas números são permitidos')]"
        />
      </div>

      <!-- Mostrar lista de nomes quando não houver pesquisa ou quando o RA for encontrado -->
      <div v-if="!showDetails && filteredAlunos.length > 0" class="q-mb-md">
        <q-list bordered>
          <q-item v-for="aluno in filteredAlunos" :key="aluno.RA" clickable v-ripple @click="selectAluno(aluno)">
            <q-item-section>
              <q-item-label>{{ aluno.Nome }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Mostrar detalhes do aluno ao clicar no nome -->
      <div v-if="showDetails">
        <!-- Botão X para fechar os detalhes -->
        <q-btn flat round icon="close" @click="closeDetails" class="q-mb-md" color="primary" />

        <!-- Informações Pessoais do Aluno -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="q-gutter-md">
              <h6 class="section-title">Informações Pessoais</h6>
              <p><strong>Nome:</strong> {{ selectedAluno.Nome }}</p>
              <p><strong>Curso:</strong> {{ selectedAluno.Curso }}</p>
              <p><strong>RA:</strong> {{ selectedAluno.RA }}</p>
              <p><strong>Idade:</strong> {{ selectedAluno.Idade }} anos</p>
              <p><strong>Termo:</strong> {{ selectedAluno.Termo }}</p>
              <p><strong>Celular:</strong> {{ selectedAluno.Celular }}</p>
              <p><strong>Telefone:</strong> {{ selectedAluno.Telefone }}</p>
              <p><strong>Data de Nascimento:</strong> {{ formatDate(selectedAluno.DataNascimento) }}</p>
              <p><strong>Estado Civil:</strong> {{ selectedAluno.EstadoCivil }}</p>
              <p><strong>Sexo:</strong> {{ selectedAluno.Sexo }}</p>
              <p><strong>Residência:</strong> {{ selectedAluno.Residencia }}</p>
              <p><strong>Família Reside:</strong> {{ selectedAluno.FamiliaReside }}</p>
              <p><strong>Locomoção:</strong> {{ selectedAluno.Locomocao }}</p>
              <p><strong>Tempo de Estudo por Dia:</strong> {{ selectedAluno.TempoEstudoDia }}</p>
            </div>
          </q-card-section>
        </q-card>

        <!-- Formação Acadêmica -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="q-gutter-md">
              <h6 class="section-title">Formação Acadêmica</h6>
              <p><strong>Ano de Conclusão do Ensino Médio:</strong> {{ formacao.AnoConclEnsMedio }}</p>
              <p><strong>Tipo de Escola:</strong> {{ formacao.TipoEscola }}</p>
              <p><strong>Formação Anterior:</strong> {{ formacao.FormacaoAnterior }}</p>
              <p><strong>Profissão Tipo:</strong> {{ formacao.ProfissaoTipo }}</p>
              <p><strong>Local de Trabalho:</strong> {{ formacao.ProfissaoLocal }}</p>
              <p><strong>Carga Horária Semanal:</strong> {{ formacao.ProfissaoCHSemanal }} horas</p>
            </div>
          </q-card-section>
        </q-card>

        <!-- Informações de Ajuda -->
        <q-card flat bordered>
          <q-card-section>
            <div class="q-gutter-md">
              <h6 class="section-title">Informações de Ajuda</h6>
              <p><strong>Áreas de Ajuda:</strong> {{ informacoesAjuda.AreasAjuda }}</p>
              <p><strong>Explicação das Áreas:</strong> {{ informacoesAjuda.ExplicacaoAreas }}</p>
              <p><strong>Explicação da Ajuda:</strong> {{ informacoesAjuda.ExplicacaoAjuda }}</p>
              <p><strong>Como Chegou ao NUAP:</strong> {{ informacoesAjuda.ComoChegouNuap }}</p>
              <p><strong>Como Conheceu o NUAP:</strong> {{ informacoesAjuda.ComoConhecNuap }}</p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchRA: '',
      showDetails: false,
      selectedAluno: null,
      alunos: [
        {
          Nome: "João Silva",
          Curso: "ADS",
          RA: "12345678",
          Idade: 22,
          Termo: 6,
          Celular: "(14) 99999-9999",
          Telefone: "(14) 1234-5678",
          DataNascimento: "2001-08-15",
          EstadoCivil: "Solteiro",
          Sexo: "Masculino",
          Residencia: "Em Marília",
          FamiliaReside: "Em Bauru",
          Locomocao: "Veículo próprio",
          TempoEstudoDia: "Somente finais de semana. Tempo dedicado: 4 horas",
        },
        {
          Nome: "Maria Oliveira",
          Curso: "Direito",
          RA: "87654321",
          Idade: 21,
          Termo: 8,
          Celular: "(14) 98888-8888",
          Telefone: "(14) 1234-5678",
          DataNascimento: "2002-05-10",
          EstadoCivil: "Solteira",
          Sexo: "Feminino",
          Residencia: "Em Bauru",
          FamiliaReside: "Em São Paulo",
          Locomocao: "Ônibus",
          TempoEstudoDia: "Estuda diariamente. Tempo dedicado: 3 horas",
        }
      ],
      formacao: {
        AnoConclEnsMedio: 2018,
        TipoEscola: "Escola Pública",
        FormacaoAnterior: "Apenas Ensino Médio Concluído",
        ProfissaoTipo: "Estágio remunerado",
        ProfissaoLocal: "Universidade",
        ProfissaoCHSemanal: 20,
      },
      informacoesAjuda: {
        AreasAjuda: "Assimilação do estudo | Técnica de estudo | Problemas emocionais pessoais",
        ExplicacaoAreas: "Dificuldade em concentração",
        ExplicacaoAjuda: "Preciso de ajuda com foco nos estudos",
        ComoChegouNuap: "Encaminhado por coord/prof.",
        ComoConhecNuap: "Coordenador",
      },
    };
  },
  computed: {
    filteredAlunos() {
      if (this.searchRA === '') {
        return this.alunos;
      } else {
        return this.alunos.filter(aluno => aluno.RA === this.searchRA);
      }
    },
  },
  methods: {
    selectAluno(aluno) {
      this.selectedAluno = aluno;
      this.showDetails = true;
    },
    closeDetails() {
      this.showDetails = false;
      this.selectedAluno = null;
    },
    formatDate(date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style scoped>
.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
}

.q-btn {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
