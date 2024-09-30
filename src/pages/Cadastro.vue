<template>
  <q-page class="q-pa-md q-mt-lg">
    <div class="row q-col-gutter-md justify-center">
      <!-- Logo -->
      <div class="col-3">
        <q-img src="/src/assets/NuapLogo2.png" alt="NuAP Logo" style="max-width: 100%;" />
        <p class="text-center text-subtitle2">Núcleo de Apoio Psicopedagógico</p>
      </div>

      <!-- Form -->
      <div class="col-6">
        <q-card class="q-pa-md">
          <div class="text-h4 text-center">Cadastro</div>

          <q-form @submit="onSubmit">
            <!-- Nome and RA -->
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-9">
                <q-input v-model="form.nome" label="Nome" outlined rounded />
              </div>
              <div class="col-3">
                <q-input v-model="form.ra" label="Ra" outlined rounded />
              </div>
            </div>

            <!-- Email -->
            <div class="q-mt-md">
              <q-input v-model="form.email" label="Email" type="email" outlined rounded />
            </div>

            <!-- Telefone and Celular -->
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-6">
                <q-input v-model="form.telefone" label="Telefone" outlined rounded />
              </div>
              <div class="col-6">
                <q-input v-model="form.celular" label="Celular" outlined rounded />
              </div>
            </div>

            <!-- Senha and Confirmar Senha -->
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-6">
                <q-input v-model="form.senha" label="Senha" type="password" outlined rounded />
              </div>
              <div class="col-6">
                <q-input v-model="form.confirmarSenha" label="Confirmar Senha" type="password" outlined rounded />
              </div>
            </div>

            <!-- Cargo -->
            <div class="q-mt-md">
              <q-select
                v-model="form.cargo"
                label="Cargo"
                outlined
                rounded
                :options="['Professor', 'Aluno', 'Coordenador']"
              />
            </div>

            <!-- Button -->
            <div class="q-mt-lg">
              <q-btn
                label="Cadastrar"
                color="primary"
                class="full-width"
                rounded
                @click="onSubmit"
              />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nome: '',
        ra: '',
        email: '',
        telefone: '',
        celular: '',
        senha: '',
        confirmarSenha: '',
        cargo: ''
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      // You can handle form submission here
    }
  }
};
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
}

.q-card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.q-btn {
  background-color: #00796b;
}

.q-btn:hover {
  background-color: #004d40;
}
</style>
