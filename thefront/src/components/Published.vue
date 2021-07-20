<template>
    <div id="lastPublished">
        <div v-for="post in posts.slice().reverse()" :key="post.id">
            <postunique :items="post"/>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import postunique from './PostProp.vue'

export default{
    name: 'published',
    components:{
        postunique
    },
  data() {
    return {
    posts: [],
    post:[],
    idPost: null,
    titre: "",
    comments: [],
    content: "",
    currentUser:{},
    items: [],
    comment:[],
    };
  },

   methods: {

////// AFFICHER TOUS LES POSTS
retrieveEveryPosts() {
      axios.get('http://localhost:8081/api/posts/')
        .then(response => {
          this.posts = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
//////////// OBTENIR L'UTILISATEUR ACTUEL
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
  this.retrieveEveryPosts();
},

}


</script>

<style scoped>
#lastPublished{
  padding: -3%;
  font-weight: 600;
}
</style>
