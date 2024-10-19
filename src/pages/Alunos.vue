<template>
  <q-page padding>

    <!-- Filtros e Tabela -->
    <div class="q-pa-md">
      <div class="row q-gutter-md q-pb-md">
        <div class="d-flex align-center">
          <div class="q-mr-sm">
            <h5 class="student-title">Agendamentos</h5>
            <span class="total-count">{{ filteredAgendamentos.length }} Agendamentos</span>
          </div>
          <q-btn-group push>
            <q-btn label="Todos" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Todos' }" @click="filterByStatus('Todos')" />
            <q-btn label="Atendido" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Atendido' }" @click="filterByStatus('Atendido')" />
            <q-btn label="Não Atendido" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Não Atendido' }" @click="filterByStatus('Não Atendido')" />
            <q-btn label="Falta" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Falta' }" @click="filterByStatus('Falta')" />
            <q-btn label="Finalizado" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Finalizado' }" @click="filterByStatus('Finalizado')" />
            <q-btn label="Cancelado" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Cancelado' }" @click="filterByStatus('Cancelado')" />
          </q-btn-group>
        </div>
      </div>

      <div class="row q-gutter-md absolute-right q-pt-lg q-mr-lg">
        <q-input v-if="tipo !== 'estagiario'"  v-model="searchEstagiario" label="RA Estagiário" outlined class="q-ml-sm" />

        <q-input v-model="searchAluno" label="RA Aluno" outlined class="q-ml-sm" />
        
        <q-input v-model="searchDate" label="Data" outlined mask="##/##/####" class="q-ml-sm" />

        <q-btn color="primary" label="Consultar" class="q-ml-sm" style="height: 55px;" @click="consultarAgendamentos" />
      </div>


      <!-- Tabela de Agendamentos -->
      <q-card flat bordered>
        <q-table
          :rows="filteredAgendamentos"
          :columns="columns"
          row-key="Agendamento"
          flat
          class="student-table"  
         
        >
          <!-- Customização da Célula de Aluno -->
          <template v-slot:body-cell-aluno="props">
            <q-td :props="props">
              <div>
                {{ props.row.aluno }}
                <div class="student-faculty">{{ props.row.curso }} - {{ props.row.termo }}</div>
              </div>
            </q-td>
          </template>

          <!-- Customização da Célula de Status -->
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div class="status-container">
                <q-badge
                  :color="getStatusColor(props.row.status)"
                  text-color="white"
                  :label="props.row.status"
                  @click="showStatusMenu(props.row, tipo)"
                  style="cursor: pointer; font-size: 1em; padding: 0.5em 1em;"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>

    <!-- Menu de Status -->
    <q-dialog v-model="statusDialog" persistent>
      <q-card class="q-pa-md" style="max-width: 400px;">
        <q-card-section>
          <div class="text-h6 text-center">Escolha o Status</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md q-px-lg">
            <q-btn
              label="Atendido"
              icon="done"
              color="positive"
              class="full-width"
              glossy
              @click="updateStatus(selectedStudent, 'Atendido')"
            />
            <q-btn
              label="Falta"
              icon="close"
              color="negative"
              class="full-width"
              glossy
              @click="updateStatus(selectedStudent, 'Falta')"
            />
            <q-btn
              label="Fila de Espera"
              icon="schedule"
              color="warning"
              class="full-width"
              glossy
              @click="updateStatus(selectedStudent, 'Fila de Espera')"
            />
            <q-btn
              label="Cancelar"
              icon="cancel"
              flat
              color="primary"
              class="full-width"
              @click="statusDialog = false"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pr-md">
          <q-btn flat label="Fechar" color="primary" @click="statusDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios';

export default {
  setup() {
    let nome = localStorage.getItem('nome');
    let tipo = localStorage.getItem('tipo');

    return {
      tipo,
      nome,
    };
  },
  data() {
    return {
      searchAluno: '',
      searchDate: '',
      selectedStatus: 'Todos',
      statusDialog: false,
      selectedStudent: null,
      agendamentos: [],
      columns: [
        { name: 'aluno', label: 'Aluno', align: 'left', field: 'aluno' },
        { name: 'alunoRA', label: 'RA Aluno', align: 'left', field: 'alunoRA' },
        { name: 'estagiario', label: 'Estagiário', align: 'left', field: 'estagiario' },
        { name: 'estagiarioRA', label: 'Estagiário RA', align: 'left', field: 'estagiarioRA' },
        { name: 'contato', label: 'Contato', align: 'left', field: 'contato' },
        { name: 'contatoTelefone', label: 'Contato Telefone', align: 'left', field: 'contatoTelefone' },
        { name: 'sala', label: 'Sala', align: 'left', field: 'sala' },
        { name: 'Data', label: 'Data Agendamento', align: 'left', field: 'Data' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
      ],
    };
  },
  computed: {
    filteredAgendamentos() {
      return this.agendamentos.filter(agendamento => {
        
        const matchesStatus = this.selectedStatus === 'Todos' || agendamento.status === this.selectedStatus;
        return matchesStatus;
      });
    },
  },
  
  methods: {
    filterByStatus(status) {
      this.selectedStatus = status;
    },
    showStatusMenu(agendamento, tipo) {
      this.selectedStudent = agendamento;
      if (tipo != "estagiario") {
        this.statusDialog = true;
      }
      
    },
    updateStatus(agendamento, status) {
      agendamento.status = status;
      this.statusDialog = false;
    },
    getStatusColor(status) {
      return status === 'Atendido' ? 'green' : status === 'Falta' ? 'red' : 'warning';
    },
    async fetchAgendamentos() {
      try {
        const response = await api.get('/consultarAgendamento');
        this.agendamentos = response.data.agendamentos; 
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    },

    async consultarAgendamentos() {
      const params = {};

      if (this.searchEstagiario) {
        params.RaEstagiario = this.searchEstagiario;
      }
      if (this.searchAluno) {
        params.RaAluno = this.searchAluno;
      }
      if (this.searchDate) {
        params.Data = this.searchDate;
      }

      try {
        const response = await api.get('/consultarAgendamento', { params });
        this.agendamentos = response.data.agendamentos;
        console.log("AGENDAMENTOS",response.data.agendamentos)
      } catch (error) {
        console.error('Erro ao consultar agendamentos:', error);
      }
    },
  },

  

  mounted() {
    this.fetchAgendamentos();//chama ao carregar pcomponente
  },
};
</script>


<style scoped>

.user-info {
  display: flex;
  align-items: center;
}

.student-table {
  margin-top: 10px;
}


.d-flex {
  display: flex;
  align-items: center;
}

.student-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.total-count {
  font-size: 16px;
  color: #666;
  margin-top: 4px;
}

.student-faculty {
  font-size: 1em;
  color: rgb(153, 153, 153);
}

.q-table__header {
  padding: 0 10px;
}

.q-table__body {
  padding: 0 10px;
}
</style>
