<template>
    <div id="inscriptionMain">
        <div class="logoInscription">
                    <img src='../assets/icon-left-font-monochrome-black.svg' class="logoConnexionPage"/>
        </div>
        <div class="messageInscription">
            <h3>Nouveau sur l'app Groupomania ? Installes-toi !</h3>
        </div>
            <div class="boxMain">
              <form name="form" @submit.prevent="handleRegister" class="informationsRegister">
        <div v-if="!successful">
          <div class="form-group">
              <input @change='onFileSelected' type="file" id="fileField" name="file" required ref="file">
            <label for="username" id="pseudoField">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
              id="pseudoField"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email" id="emailField">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
              id="emailField"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password" id="mdpField">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
              id="mdpField"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <button class="validateRegister">
              <span>SignUp</span>
              </button>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
    </div>
</template>

<script>
import User from '../models/user.model.js';
import axios from 'axios'


export default {
  name: 'Register',
  data() {
    return {
      
      submitted: false,
      successful: false,
      message: '',
      selectedFile: null,
      user : new User('', '', '', ''),
    }
  },



  methods: {

    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)

      
    },



          
 
   handleRegister() {

      this.$validator.validate().then(isValid => {
        if (isValid) {

      
      const formData = new FormData()
      formData.append('image', this.selectedFile)
      formData.append('username', this.user.username)
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)
      axios.post('http://localhost:8081/api/auth/signup', formData,{})
      
      .then((res) => {

            window.localStorage.setItem('token', res.data.token)
            window.location.href = "/";
      },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },

  },
};
</script>


<style scoped>
#inscriptionMain{
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
.informationsRegister{

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
  margin: 2rem;
    
}
#pseudoField, #mdpField, #fileField, #emailField {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 2rem;

}

.validateRegister{
  color: black;
  background: white;
  text-align: center;
  border: none;
  margin-top: 2rem;

}

.newUser, a{
    color: white;
    outline: none;
    text-align: center;

}

button{
  border: none;
}
</style>