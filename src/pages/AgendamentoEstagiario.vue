<template>
  <q-page padding>

    <!-- Filtros e Tabela -->
    <div class="q-pa-md">
      <div class="row q-gutter-md q-pb-md">
        <div class="d-flex align-center">
          <div class="q-mr-sm">
            <h5 class="student-title">Alunos</h5>
            <span class="total-count">{{ filteredStudents.length }} Alunos</span>
          </div>
          <q-btn-group push>
            <q-btn label="Todos" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Todos' }" @click="filterByStatus('Todos')" />
            <q-btn label="Atendido" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Atendido' }" @click="filterByStatus('Atendido')" />
            <q-btn label="Não Atendido" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Não Atendido' }" @click="filterByStatus('Não Atendido')" />
            <q-btn label="Falta" outlined :class="{ 'bg-primary text-white': selectedStatus === 'Falta' }" @click="filterByStatus('Falta')" />
          </q-btn-group>
        </div>
      </div>

      <div class="row q-gutter-md absolute-right q-pt-lg q-mr-lg">
        <q-input v-model="searchAluno" label="RA Aluno" outlined class="q-ml-sm" :rules="[val => (val === '' || /^\d+$/.test(val) || 'Apenas números são permitidos')]" />
        <q-input v-model="searchDate" label="Data" outlined mask="##/##/####" class="q-ml-sm" />
        <q-btn color="primary" label="Cadastrar Aluno" class="q-ml-sm" style="height: 55px;" />
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
            <q-td :props="props">
              <div>
                {{ props.row.name }}
                <div class="student-faculty">{{ props.row.faculdade }}</div>
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
                  @click="showStatusMenu(props.row)"
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
export default {
  setup(){//
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
      searchEstagiario: '',
      searchDate: '',
      selectedStatus: 'Todos',
      students: [
        {
          ra: '87345623',
          name: 'Brooklyn Simmons',
          faculdade: 'Engenharia da Computação',
          email: 'brooklyn@gmail.com',
          contact: '(603) 555-0123',
          date: '21/10/2022',
          time: '10:30',
          status: 'Atendido',
        },
        {
          ra: '89374653',
          name: 'Kristin Watson',
          faculdade: 'Administração',
          email: 'kristinw@gmail.com',
          contact: '(218) 555-0114',
          date: '22/10/2022',
          time: '11:00',
          status: 'Falta',
        },
        {
          ra: '23847659',
          name: 'Jacob Jones',
          faculdade: 'Psicologia',
          email: 'jacobj@gmail.com',
          contact: '(218) 555-0115',
          date: '23/10/2022',
          time: '09:00',
          status: 'Fila de Espera',
        },
        {
          ra: '39485652',
          name: 'Cody Fisher',
          faculdade: 'Direito',
          email: 'codyf@gmail.com',
          contact: '(228) 555-0099',
          date: '24/10/2022',
          time: '02:00',
          status: 'Atendido',
        },
        {
          ra: '16848953',
          name: 'Pedrinho Breu',
          faculdade: 'Medicina',
          email: 'Pedrf@gmail.com',
          contact: '(134) 668-7890',
          date: '25/10/2022',
          time: '03:30',
          status: 'Atendido',
        },
        {
          ra: '98648536',
          name: 'Mikaeh Russ',
          faculdade: 'Educação Física',
          email: 'Mika@gmail.com',
          contact: '(468) 999-6899',
          date: '01/02/2022',
          time: '12:00',
          status: 'Falta',
        },
      ],
      statusDialog: false,
      selectedStudent: null,
      isAllSelected: true,
      columns: [
        { name: 'name', label: 'Nome', align: 'left', field: 'name' },
        { name: 'ra', label: 'RA', align: 'left', field: 'ra' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'contact', label: 'Contato', align: 'left', field: 'contact' },
        { name: 'date', label: 'Data Cadastro', align: 'left', field: 'date' },
        { name: 'time', label: 'Horário Cadastro', align: 'left', field: 'time' },
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
      this.selectedStatus = 'Todos';
    },
    filterByStatus(status) {
      this.isAllSelected = false;
      this.selectedStatus = status;
    },
    showStatusMenu(student) {
      this.selectedStudent = student;
      this.statusDialog = true;
    },
    updateStatus(student, status) {
      student.status = status;
      this.statusDialog = false;
    },
    getStatusColor(status) {
      return status === 'Atendido' ? 'green' : status === 'Falta' ? 'red' : 'warning';
    },
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
  font-size: 0.9em;
  color: rgb(181, 204, 204);
}

.q-table__header {
  padding: 0 10px;
}

.q-table__body {
  padding: 0 10px;
}


</style>
