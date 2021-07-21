<template>
    <div id="inscriptionMain">
        <div class="messageInscription">
            <h3>Nouveau sur l'app Groupomania ? Installes-toi !</h3>
        </div>
            <div class="boxMain">
              <form name="form" @submit.prevent="handleRegister" class="informationsRegister">
                <div v-if="!successful">
                  <div class="form-group">
                      <input @change='onFileSelected' type="file" id="fileField" name="image_field" required
                      accept="image/png, image/jpeg, image/bpm, image/jpg, image/gif">      
                    <label for="username" id="pseudoField">Username</label>
                      <input
                      minlength="4"
                      v-model="user.username"
                      required
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
                    required
                    type="email"
                    class="form-control"
                    name="email"
                    id="emailField"
                    placeholder="Ex: dwayne@johnsonmail.com"
                    />
                  <div
                    v-if="submitted && errors.has('email')"
                    class="alert-danger"
                  >{{errors.first('email')}}</div>
                </div>

                <div class="form-group">
                  <label for="password" id="mdpField" >Password</label>
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    name="password"
                    id="mdpField"
                    placeholder="8 caractères mini, lettres chiffres et caractères spéciaux"
                    required
                  />
                  <div
                    v-if="submitted && errors.has('password')"
                    class="alert-danger"
                  >{{errors.first('password')}}</div>
                </div>
                <div class="form-btn">
                  <button class="validateRegister">
                    <span>S'inscrire</span>
                    </button>
                </div>
                </div>
                <div class="form group error"
                v-if="message"
                :class="successful ? 'alert-success' : 'alert-danger'"
                ><p>{{message}}</p></div>
              </form>
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
        if (/\S/.test(this.user.username) && isValid) { //Si il n'y a pas d'espaces excessifs et que le formulaire est vee-validate

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
                error ||
                error.toString();
              this.successful = false;
            }
          );
        }
        else{
          this.message = "Veuillez rentrer un pseudo valide.";
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

.logoInscription{
  height: 100%;
  width: 100%;
}

.form-group{
  display: flex;
  flex-direction: column;
  flex-shrink:0;
  flex-grow:0;
}

.boxMain{
  background-color: rgba(0, 0, 0, 0.89);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  border-radius: 2%;
  flex-shrink:0;
  flex-grow:0;
}

.titleBox{
  text-align: center;
  margin: 2rem;
  text-transform: uppercase;
  text-decoration: overline;
}
.informationsRegister{
  row-gap: 2rem;
  margin: 2rem;
}

#pseudoField, #mdpField, #fileField, #emailField {
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

.form-btn{
text-align: center;
}

.newUser, a{
  color: white;
  outline: none;
  text-align: center;

}

.error{
  width: 100%;
  background: #C40030;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1rem;
}

.validateRegister{
  margin-top: 1rem;
  height: 2.5rem;
  background-color: green;
  color: white;
  border: none;
  border: solid 2px white;
  border-radius: 5px;
  cursor: pointer;
  transition: .4s ease;
}

.validateRegister:hover{
  transform: scale(1.07);
}
</style>