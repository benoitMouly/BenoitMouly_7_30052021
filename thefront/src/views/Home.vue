<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/icon.svg" class="logoHome"> -->
    <HelloWorld msg="Bienvenue"/>
    <p>Bienvenue {{currentUser.username}}</p>
    <publish/>
    <h3>Les derniers posts :</h3>
      <published/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import publish from '../components/ToPublish.vue'
import published from '@/components/Published.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    publish,
    published,

  },
  data() {
    return{
      currentUser : '',
    }
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
      .catch(e => {
          console.log(e)
      })
    },
  },

  mounted(){
    this.getCurrentUser();
  }
}
</script>

<style scoped>

.logoHome{
  max-height: 10rem;
}

.home{
  height: 100%;
}
</style>