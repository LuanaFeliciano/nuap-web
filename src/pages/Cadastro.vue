<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mt-sm q-ml-lg">
      <div class="col-3">
        <q-img src="/src/assets/NuapLogo2.png" alt="NuAP Logo" style="max-width: 230px;" />
      </div>

      <div class="col-6" style="margin-top: 100px;">
        <q-card class="q-pa-md">
          <div class="text-h4 " style="margin-bottom: 50px;">Cadastro</div>

          <q-form @submit.prevent="onSubmit">
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-9">
                <q-input v-model="form.nome" label="Nome" outlined rounded />
              </div>
              <div class="col-3">
                <q-input v-model="form.RA" label="RA" outlined rounded mask="######-#"/>
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
                <q-input v-model="form.password" label="Senha" type="password" outlined rounded />
              </div>
              <div class="col-6">
                <q-input v-model="form.confirmarSenha" label="Confirmar Senha" type="password" outlined rounded />
              </div>
            </div>

            <div class="q-mt-lg">
              <q-select
                v-model="form.tipo"
                label="Cargo"
                outlined
                rounded
                :options="['Atendente', 'Estagiario', 'Coordenador']"
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
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    
    const form = ref({
      nome: '',
      RA: '',
      email: '',
      telefone: '',
      celular: '',
      password: '',
      confirmarSenha: '',
      tipo: ''
    });

    const onSubmit = () => {
      
      if (form.value.password !== form.value.confirmarSenha) {
        $q.notify({ color: 'red', message: 'As senhas não coincidem.' });
        return;
      }

      const tipo = {
        'Atendente': 'atendente',
        'Estagiario': 'estagiario',
        'Coordenador': 'coordenadora'
      };

      const body = {
        nome: form.value.nome,
        email: form.value.email,
        password: form.value.password,
        celular: form.value.celular,
        tipo: tipo[form.value.tipo] || form.value.tipo,
        RA: form.value.RA,
        telefone: form.value.telefone
      };

      //cadastrar
      api.post('/register', body)
        .then((response) => {
          console.log(response);
          $q.notify({ color: 'secondary', message: response.data.message });
          
          $router.push('/');
        })
        .catch((error) => {
          console.log(error.response.data.data);
          if (error.response && error.response.data.data) {
            if (error.response.data.data.error) {
              const erro = error.response.data.data.error; 
              $q.notify({ color: 'red', message: erro });
            } else {
              const validationErrors = error.response.data.data; 
              Object.values(validationErrors).forEach((messages) => {
                messages.forEach((msg) => {
                  $q.notify({ color: 'red', message: msg });
                });
              });
            }
          } else {
            $q.notify({ color: 'red', message: 'Cadastro falhou. Tente novamente.' });
          }
        });
    };

    return {
      form,
      onSubmit
    };
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
