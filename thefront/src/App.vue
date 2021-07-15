<template>
  <div id="nav">
      <div id="mainBlock">
        <img src="./assets/icon-left-font-monochrome-black.svg" class="logoFullBlack"/>
          <div class="menuElements" v-if='currentUser'><router-link to="/">Accueil</router-link> <!--| 
          <router-link to="/profil" >Profil</router-link> | 
          <router-link to="/UserProfile/:id">userProfile</router-link> -->
          | <a class="nav-link" href @click.prevent="logout">Déconnexion</a></div>


          <div class="menuElements" v-if="!currentUser"><router-link to="/register">Inscription</router-link> | 
          <router-link to="/login">Login</router-link></div>
          
      </div>
        <router-view/>
  <div id="footer">
        <footerElement/>
  </div>
  </div>

</template>


<style lang="scss">

#mainBlock{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-height: 100%;
  max-width: 100%;
  margin: 4px 4px 4px 4px;
  border-bottom: solid 3px black;
}

.logoFullBlack{
  max-height: 2rem;
}
body {
  font-family: Avenir, Montserrat, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.8rem;
  color: #2c3e50;
  max-height: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

#mainBlock{
  padding: 10px;
  background: #FFF;
  /*border-bottom: solid 3px black;
  margin: 0px -8px 0px -8px;*/
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #C40030;
    }

    &:hover{
      color: brown;
    }
  }
}

#footer{
  margin: 0px -8px 0px -8px;
  max-width: 100%;
}
/*button{
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.89);
  border: 1px solid white;
  outline: none;
  font-weight: 700;
  color: white;
  border-radius: 100px;
  font-size: 1em;

}*/
#buttonFieldSend{
  padding: 1.5%;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: .4s ease;
}

#buttonFieldSend:hover{
  transform: scale((1.07));
}

#eraseButton{
  padding: 1.5%;
  color: #FFF;
  background: #C40030;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: .4s ease;
}

#eraseButton:hover{
  transform: scale((1.07));
}

</style>

<script>
import footerElement from '@/components/footer.vue'
import axios from 'axios'
export default{
  name : 'app',
  data(){
    return {
    currentUser : null,
    }
  },
  components : {
    footerElement
  },
 methods:{



          getCurrentUser(){
      axios.get('http://localhost:8081/api/users/current', {
          headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
      })
      .then(reponse => {
 
                   this.currentUser = reponse.data;
        
          
      })
     .catch(error => {
          console.log(error)
      })
      },
      
     logout() {
    localStorage.removeItem('token');
    window.location.href = "/Bienvenue"
  },

 },
 mounted() {
  this.getCurrentUser();
 }
};
</script>