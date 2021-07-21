<template>
    <div id="mainBlockUserProfil">
        <div id="infoUser">
            <div class="picUser">
                <img :src="currentProfile.image" class="picProfile"/>
                    <div class="btnSupp" v-if="currentUser.userId == this.id || currentUser.userRight">
            <button id="eraseButton" @click="eraseUser()">Supprimer le compte <font-awesome-icon icon="user-slash"/></button>
                    </div>
                    <div class ="btnModify" v-if="currentUser.userId == this.id || currentUser.userRight">
                        <input @change='onFileSelected' type="file" id="fileField" name="image_field" required
                        accept="image/png, image/jpeg, image/bpm, image/jpg, image/gif">
            <button id="updateButton" @click="updateUser()">Changer la photo <font-awesome-icon icon="camera"/></button>
                    </div>
            </div>
            <div class="pseudo">
            <h3>Profil de {{currentProfile.username}}</h3>
            </div>
        </div>
            <h4>Ses contributions :</h4>
            <p class="contributions" v-if="userPost == true">
                {{currentProfile.posts}}</p>
            <p v-if="userPost == false">Cet utilisateur n'a pour le moment rien publié</p>
            <div v-for='post in userPost' :key='post.id'>
                <postunique :items="post"/>
            </div>
    </div>
</template>

<script>
import postunique from '@/components/PostProp.vue'
import axios from 'axios'

export default {
  name: 'UserProfil',
  components: {
   postunique
  },
  data(){
      return{
          currentUser: {},
          currentProfile: {},
          users : [],
          userPost: [],
          userId: '',
        id: this.$route.params.id
      }
  },


  methods: {

///////////////// GET CURRENT PROFILE
    getCurrentProfile(){

        axios.get('http://localhost:8081/api/users/user/'+this.id, {
          headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
      })
      .then(reponse => {
          this.currentProfile = reponse.data;
          console.log(this.currentProfile)
          //window.location.href = "/UserProfile/:id";
          
      })
      .catch(e => {
          console.log(e)
      })
  }, 
/////////////// GET CURRENT USER
    getCurrentUser(){
      axios.get('http://localhost:8081/api/users/current', {
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

///////////////// POST FOR 1 SPECIFIC USER
    getPostsFromUser(){
      axios.get('http://localhost:8081/api/posts/users/'+this.id, {
            headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
      .then(reponse => {
          this.userPost = reponse.data
      })
  },

////////////// GET ALL USERS
    getEveryUsers(){
        axios.get('http://localhost:8081/api/users', {
             headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
        .then(reponse =>{
            this.users = reponse.data
        })
    },

/////////////// ERASE USER
    eraseUser(){
        const answer = window.confirm("Voulez vous vraiment supprimer ce profil ?");
        if(answer){
            axios.delete('http://localhost:8081/api/users/current', {
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
    }
},

///////////////// UPDATE USER
    onFileSelected(event){
    
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile)
    },     
 
    updateUser(){
        const formData = new FormData()
        formData.append('image', this.selectedFile)
        axios.put('http://localhost:8081/api/users/myprofil', formData,{
                            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')}
        })

        .then(() => {
            window.location.reload(false);
        },

        error => {
            this.message =
                (error.response && error.response.data) ||
                error ||
                error.toString();
                this.successful = false;
            }
        )}


},


  mounted(){
    this.getCurrentUser();
    this.getCurrentProfile();
    this.getEveryUsers();
    this.getPostsFromUser();
  },
}
</script>

<style scoped>


#infoUser{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.picProfile{
    width: 10rem;
    border-radius: 5%;

}

.pseudo{
    color: chocolate;
}

.picUser{
    display: block;
    text-align: center;
}
.btnModify{
    display: block;
    margin-top: 2rem;
    text-align: center;
    border: solid 2px #3e7f8f;
    padding: 8px;
}
</style>