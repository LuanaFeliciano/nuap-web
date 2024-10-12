<template>
  <q-page class="login-page">
    <div class="left-side">
      <q-img src="/src/assets/LogoNuAP.png" class="logo" />
      <div class="welcome-text">
        <h2>Bem Vindo ao NuAP!</h2>
        <p class="description">
          Serviço de Apoio Psicopedagógico ao universitário da UNIMAR
        </p>
      </div>
    </div>
    <div class="right-side">
      <div class="login-box">
        <h3>Login</h3>
        <q-input outlined rounded v-model="email" label="Email" filled class="login-input" />
        <q-input outlined rounded v-model="password" label="Senha" type="password" filled class="login-input"/>
        <q-btn @click="login" label="Login" color="#ffffff" class="login-button" />
        <q-btn to="/cadastro"  flat label="Cadastre-se" color="#ffffff" class="register" />
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
    const email = ref('');
    const password = ref('');
    const $router = useRouter();

    const login = () => {
      api.post('/login', {
        email: email.value,
        password: password.value
      })
      .then((response) => {
        console.log(response);
        const { token, nome, tipo } = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('nome', nome);
        localStorage.setItem('tipo', tipo);

        $q.notify({ color: 'secondary', message: response.data.message });
        $router.push('/alunos');
      })
      .catch((error) => {
        console.log(error.response.data.data.error)
        if (error.response && error.response.data.data) {

            if (error.response.data.data.error) {
              const erro = error.response.data.data.error; 
              $q.notify({ color: 'red', message: erro });
            }else{
            const validationErrors = error.response.data.data; 
            Object.values(validationErrors).forEach((messages) => {
              messages.forEach((msg) => {
                $q.notify({ color: 'red', message: msg });
              });
            });
          }
          } else {
            $q.notify({ color: 'red', message: 'Login falhou. Tente novamente.' });
          }
      });
    };

    return {
      email,
      password,
      login
    };
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  background: linear-gradient(180deg, #00ADEE, #149e93, #077157);
}

.left-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.logo {
  width:400px;
  margin-bottom: 20px;
}

.welcome-text {
  color: white;
  text-align: center;
}

.welcome-text h1 {
  font-size: 2.5em;
  font-weight: bold;
  margin: 10px 0;
}


.description {
  font-size: 1.8em;
  margin-top: 5px;
  font-weight: 3500;
}

.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 20px 20px 0;
  padding: 40px;
}

.login-box {
  width: 400px;
  text-align: center;
  color: rgb(255, 255, 255);
}

.login-box h2 {
  font-size: 1.8em;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
}

.login-input {
  margin-bottom: 20px;
  border-radius: 100px;
  background: #ffffff;
}

.login-button {
  width: 200px;
  background:#0B8069;
  color: rgb(255, 255, 255);
  border-radius: 50px;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.register {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 95px;
  margin-right: 95px;
  color: #ffffff;
  font-size: 0.9em;
  align-items: center;
}
</style>
