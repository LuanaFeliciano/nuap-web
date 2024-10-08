<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mt-sm q-ml-lg">
      <div class="col-3">
        <q-img src="/src/assets/NuapLogo2.png" alt="NuAP Logo" style="max-width: 230px;" />
      </div>

      <div class="col-6" style="margin-top: 100px;">
        <q-card class="q-pa-md">
          <div class="text-h4 " style="margin-bottom: 50px;">Cadastro</div>

          <q-form @submit="onSubmit">
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-9">
                <q-input v-model="form.nome" label="Nome" outlined rounded />
              </div>
              <div class="col-3">
                <q-input v-model="form.ra" label="Ra" outlined rounded mask="######-#"/>
              </div>

            </div>

            <div class="q-mt-lg">
              <q-input v-model="form.email" label="Email" type="email" outlined rounded />
            </div>
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-6">
                <q-input v-model="form.telefone" label="Telefone" outlined rounded mask="(##) ####-####" />
              </div>
              <div class="col-6">
                <q-input v-model="form.celular" label="Celular" outlined rounded mask="(##) ####-####" />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-6">
                <q-input v-model="form.senha" label="Senha" type="password" outlined rounded />
              </div>
              <div class="col-6">
                <q-input v-model="form.confirmarSenha" label="Confirmar Senha" type="password" outlined rounded />
              </div>
            </div>

            <div class="q-mt-lg">
              <q-select
                v-model="form.cargo"
                label="Cargo"
                outlined
                rounded
                :options="['Atendente', 'Estágiario', 'Coordenador']"
              />
            </div>

            <div class="q-mt-lg">
              <q-btn
                label="Cadastrar"
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

    }
  }
};
</script>

<style scoped>
.q-page {
  background-color: #ffffff;
}

.q-card {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
}

.q-btn {
  background-color: #3e867e;
  height: 50px;
  color: #ffffff;
}

.q-btn:hover {
  background-color: #004d40;
}

.text-h4 {
  color: #00505B;
  font-size: 60px;
}
</style>
