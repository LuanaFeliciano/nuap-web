<template>
  <q-page padding>
    <!-- Barra de Navegação Superior -->
    <q-bar class="bg-primary text-white q-pa-md header-bar">
      <q-img src="/src/assets/LogoNuAP.png" class="q-mr-md logo-img" width="120px" />
      <q-btn flat label="Aluno" class="q-ml-sm" style="min-height: 40px; font-size: 16px;" />
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

    <!-- Filtros e Tabela -->
    <div class="q-pa-md">
      <!-- Filtros de Pesquisa -->
      <div class="row q-gutter-md q-pb-md">
        <div class="d-flex align-center">
          <div class="q-mr-sm">
            <h5 class="student-title">Alunos</h5>
            <span class="total-count"> {{ filteredStudents.length }} Alunos</span>
          </div>
          <q-btn-group push>
            <q-btn label="Todos" outlined :class="{ 'bg-primary text-white': isAllSelected }" @click="selectAll" />
            <q-btn label="Atendido" outlined @click="filterByStatus('Atendido')" />
            <q-btn label="Não Atendido" outlined @click="filterByStatus('Não Atendido')" />
            <q-btn label="Falta" outlined @click="filterByStatus('Falta')" />
            <q-btn label="Fila de Espera" outlined @click="filterByStatus('Fila de Espera')" />
          </q-btn-group>
        </div>

        <q-input v-model="searchAluno" label="RA Aluno" outlined class="q-ml-sm" />
        <q-input v-model="searchEstagiario" label="RA Estagiário" outlined class="q-ml-sm" />
        <q-input v-model="searchDate" label="Data" outlined mask="##/##/####" class="q-ml-sm" />
        <q-btn color="primary" label="Cadastrar Aluno" class="q-ml-sm" />
      </div>

      <!-- Tabela de Alunos -->
      <q-card flat bordered>
        <q-table
          :rows="filteredStudents"
          :columns="columns"
          row-key="ra"
          flat
          class="student-table"
        >
          <!-- Customização da Célula de Nome -->
          <template v-slot:body-cell-name="props">
            <div>
              {{ props.row.name }}
              <div class="student-faculty">{{ props.row.faculdade }}</div>
            </div>
          </template>

          <!-- Customização da Célula de Status -->
          <template v-slot:body-cell-status="props">
            <q-chip
              :color="getStatusColor(props.row.status)"
              text-color="white"
              size="md"
              @click="showStatusMenu(props.row)"
            >
              {{ props.row.status }}
            </q-chip>
          </template>
        </q-table>
      </q-card>
    </div>

    <!-- Menu de Status -->
    <q-dialog v-model="statusDialog" persistent>
      <q-card>
        <q-card-title>Escolha o Status</q-card-title>
        <q-card-actions>
          <q-btn flat label="Atendido" @click="updateStatus(selectedStudent, 'Atendido')" />
          <q-btn flat label="Falta" @click="updateStatus(selectedStudent, 'Falta')" />
          <q-btn flat label="Fila de Espera" @click="updateStatus(selectedStudent, 'Fila de Espera')" />
          <q-btn flat label="Cancelar" @click="statusDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchAluno: '',
      searchEstagiario: '',
      searchDate: '',
      selectedStatus: 'Todos', // Adicione essa linha
      students: [
        {
          ra: '87345623',
          name: 'Brooklyn Simmons',
          faculdade: 'Engenharia da Computação',
          email: 'brooklyn@gmail.com',
          contact: '(603) 555-0123',
          date: '21/10/2022',
          status: 'Atendido',
        },
        {
          ra: '89374653',
          name: 'Kristin Watson',
          faculdade: 'Administração',
          email: 'kristinw@gmail.com',
          contact: '(218) 555-0114',
          date: '22/10/2022',
          status: 'Falta',
        },
        {
          ra: '23847659',
          name: 'Jacob Jones',
          faculdade: 'Psicologia',
          email: 'jacobj@gmail.com',
          contact: '(218) 555-0115',
          date: '23/10/2022',
          status: 'Fila de Espera',
        },
        {
          ra: '39485652',
          name: 'Cody Fisher',
          faculdade: 'Direito',
          email: 'codyf@gmail.com',
          contact: '(228) 555-0099',
          date: '24/10/2022',
          status: 'Atendido',
        },
        {
          ra: '16848953',
          name: 'Pedrinho Breu',
          faculdade: 'Medicina',
          email: 'Pedrf@gmail.com',
          contact: '(134) 668-7890',
          date: '39/10/2022',
          status: 'Atendido',
        },
        {
          ra: '98648536',
          name: 'Mikaeh Russ',
          faculdade: 'Educação Física',
          email: 'Mika@gmail.com',
          contact: '(468) 999-6899',
          date: '01/02/2022',
          status: 'Falta',
        },
      ],
      statusDialog: false,
      selectedStudent: null,
      isAllSelected: true, // Para o botão "Todos"
      columns: [
        { name: 'name', label: 'Nome', align: 'left', field: 'name', },
        { name: 'ra', label: 'RA', align: 'left', field: 'ra' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'contact', label: 'Contato', align: 'left', field: 'contact' },
        { name: 'date', label: 'Data Cadastro', align: 'left', field: 'date' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
      ],
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        const matchesSearch = student.name.includes(this.searchAluno) &&
                              student.ra.includes(this.searchEstagiario) &&
                              (this.searchDate ? student.date.includes(this.searchDate) : true);
        const matchesStatus = this.selectedStatus === 'Todos' || student.status === this.selectedStatus;
        return matchesSearch && matchesStatus;
      });
    },
  },
  methods: {
    selectAll() {
      this.isAllSelected = true;
      this.selectedStatus = 'Todos'; // Reseta o status selecionado para Todos
    },
    filterByStatus(status) {
      this.isAllSelected = false; // Desmarca o botão "Todos"
      this.selectedStatus = status; // Armazena o status selecionado
    },
    getStatusColor(status) {
      switch (status) {
        case 'Atendido':
          return 'green';
        case 'Falta':
          return 'red';
        case 'Fila de Espera':
          return 'orange';
        default:
          return 'grey';
      }
    },
    updateStatus(student, status) {
      const studentToUpdate = this.students.find(s => s.ra === student.ra);
      if (studentToUpdate) {
        studentToUpdate.status = status;
      }
      this.statusDialog = false;
    },
    showStatusMenu(student) {
      this.selectedStudent = student;
      this.statusDialog = true;
    },
  },
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

.student-table {
  margin-top: 10px;
}

.bg-primary {
  background-image: linear-gradient(#00ADEE, #19B1A4, #077157) !important;
}

.d-flex {
  display: flex;
  align-items: center; /* Alinhamento vertical */
}

.student-title {
  font-size: 24px;
  font-weight: bold;
  color: #333; /* Cor do título */
  margin: 0; /* Remove a margem padrão */
}

.total-count {
  font-size: 16px;
  color: #666; /* Cor da contagem */
  margin-top: 4px; /* Adiciona um pequeno espaço entre o título e a contagem */
}

.student-faculty {
  font-size: 0.9em;
  color: rgb(181, 204, 204); /* Cor mais clara para a faculdade */
}

</style>
