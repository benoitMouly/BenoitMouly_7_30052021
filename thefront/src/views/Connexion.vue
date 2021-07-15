<template>
    <div id="connexionMain">
    <div class="logoConnexion">
        <img src='../assets/icon-left-font-monochrome-black.svg' class="logoConnexionPage"/>
    </div>
    <div class="messageConnexion">
        <h3>Bienvenue sur l'application Groupomania.</h3>
    </div>
    <div class="boxMain">
        <div>
            <span class="titleBox"><h4>Connexion</h4></span>
            
            <form name="form" @submit.prevent="handleLogin" class="informationsLogin">
                <div class="form-group">
                    <label for="username" id="pseudoField">Pseudo</label>
                    <input v-model="user.username"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    name="username"
                    id="pseudoField"
                    />
                    <div
                    v-if="errors.has('user.name')"
                    role="alert">Pseudo requis !</div>
                    </div>
                <div class="form-group" id="mdpField">
                    <label for="password">Password</label>
                    <input
                        v-model="user.password"
                        v-validate="'required'"
                        type="password"
                        class="form-control"
                        name="password"
                        id="mdpField"
                    />
                    <div
                        v-if="errors.has('password')"
                        role="alert"
                    >Password is required!</div>
                    </div>
                     <div class="form-group">
          <button class="validateLogin" :disabled="loading">
            <span v-show="loading"></span>
            <span>Connexion</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
    </div>
    </div>
</template>

<script>
import User from '../models/user.model';
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },

  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
      let uname = this.user.username;
      let pass = this.user.password;
      axios.post('http://localhost:8081/api/auth/login',{
        username: uname,
        password: pass
      })

      .then(res => {

                window.localStorage.setItem('token', res.data.token)
                window.location.href = "/";

      },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>

#connexionMain{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    margin-top: 2rem;
}


.boxMain{
    background-color: rgba(0, 0, 0, 0.89);
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0% 5% 0% 5%;
    color: white;
    border-radius: 2%;

}

.titleBox{
    text-align: center;
    margin: 2rem;
    text-transform: uppercase;
    text-decoration: overline;
}


.informationsLogin{
  
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 2rem;
  margin: 2rem;
}

#pseudoField, #mdpField{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 2rem;

}

.validateLogin{
  background: white;
  color: black;
  text-align: center;
  border: none;
}

.newUser, a{

    color: white;
    outline: none;
    text-align: center;

}

</style>