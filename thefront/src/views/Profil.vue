<template>
<div id="mainSectionProfile">
    <h3>Mon Profil</h3>
    <div id="secondSectionProfile">
        <div class="pic">
            <h4>Ma photo</h4>
            <img :src="currentUser.image" class="picProfile"/>
            <div class="chooseFile">
            <input  type="file" id="fileField" name="file" required ref="file">
            </div>
        </div>
        <div class="Pseudo">
            <h4>{{currentUser.username}}</h4>
            <input type="text" id="nameModif"
            name="name" required minlength="4" maxlength="800" size="auto" placeholder="Modifiez votre pseudo...">
        </div>
        <div class="PasswordModif">
            <h4>Mon mot de passe</h4>
            <input type="text" id="passwordField"
            name="name" required minlength="4" maxlength="800" size="auto" placeholder="Modifiez votre mdp...">
        </div>
    </div>
    <div id="thirdSectionProfile">
        <div class="btnValid">
            <button id="buttonField">Valider les changements</button>
        </div>
        <div class="btnSupp">
            <button id="eraseButton" @click="eraseUser()">Supprimer le compte</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data(){
      return{
          currentUser:{},
          users: {
              username: {}
          }
      }
  },

    mounted(){
        this.getCurrentUser();
    },
  
    methods:{

//// On récupére le token
    getToken(){
        const token = localStorage.getItem('token')
        console.log(token)
    },

    getCurrentUser(){
      axios.get('http://localhost:8081/api/users/monprofil', {
          headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
      })
      .then(reponse => {
          this.currentUser = reponse.data;
          console.log(this.currentUser)
          
      })
      .catch(e => {
          console.log(e)
      })
    },
 
    eraseUser(){
    axios.delete('http://localhost:8081/api/users/monprofil', {
        headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')}
    })
    .then(reponse => {
        console.log(reponse)
        window.location.href = "/login";
    })
    .catch(e => {
        console.log(e)
    })
},

  },
}
</script>




<style scoped>
#secondSectionProfile{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pic{
    display: flex;
    flex-direction: column;
}

.picProfile{
    width: 10em;
    border-radius: 50%;
}

#thirdSectionProfile{
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    column-gap: 2rem;
}

#eraseButton{
    background-color: #C40030;
}

</style>