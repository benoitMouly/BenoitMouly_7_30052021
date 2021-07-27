<template>
    <div class="publishedBox">
        <div class="cardPost">
            <div class="thePost">
                <p> Par <router-link :to="{ name: 'userProfile', params: { id : this.userId}}">{{items.user.username}}</router-link>,
                le {{items.createdAt}}
                <font-awesome-icon icon="trash" class="trash"  v-if="currentUser.userRight || currentUser.userId == items.userId" @click="erasePost()"/></p>
                <h3 class="titlePost">{{items.title}} </h3>
                <img class="imgPublished" :src="items.image">
            </div>
            <div class="commentPublish">
                <div class="theField"><input type="text" class="commentField"
                name="name" required minlength="4" maxlength="800" size="auto" pattern="^[a-zA-Z]+( [a-zA-Z]+)*$" placeholder="{Ajoutez un Commentaire...}" v-model="content"/>
                </div>
                <div class="theButtonSend">
                <button id="buttonFieldComment" class="buttonComment" @click="addComment()">Envoyer <font-awesome-icon icon="arrow-circle-right"/></button>
                </div>
            </div>
            <div class="andif" v-if="comments"> 
             <onecomment :commentitem="comment" v-for="comment in comments.slice().reverse()" :key="comment.id"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import onecomment from './CommentProp.vue'

export default{
    name: 'postunique',
    props:['items', 'id'],
    components: {
      onecomment
    },
  data() {
    return {
    posts: [],
    post:[],
    comments: [],
    comment: onecomment,
    content: "",
    currentUser : {},
    userId : this.items.userId
    };
  },

   methods: {
///////////////////////////////////// RETRIEVE COMMENTS
    retrieveEveryComments(){
        axios.get('http://localhost:8081/api/posts/'+this.items.idPost+'/comments/')
        .then(reponse => {
            this.comments = reponse.data;
        })
    },
////////////////////////// ADD COMMENT
    addComment() {
        
        const contentlength = this.content.length;

        if (/\S/.test(this.content) && contentlength >= 4){
        axios.post('http://localhost:8081/api/comments/',{

        content : this.content,
        itemId: this.items.idPost
        },
        {
        headers: {

          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        
        })
        .then(reponse =>{
            this.items.comment = reponse.data
            this.id = reponse.data
            window.location.reload(false);


        })
        .catch(e => {
            console.log(e)
        })
    }
    },

//////////////// CURRENT USER
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

/////////////////////// POST DELETE ////////////////////
erasePost(){

    const answer = window.confirm("Voulez vous vraiment supprimer cette publication ?");

    if(answer){
    axios.delete('http://localhost:8081/api/posts/'+this.items.idPost, {
        headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')}
    })
    .then(reponse => {
        console.log(reponse)
        window.location.reload(false);


    })
    .catch(e => {
        console.log(e)
    })
    }
},


},


mounted(){
  this.getCurrentUser();
  this.retrieveEveryComments();
},

}


</script>

<style scoped>

.commentField{

    margin-top: 1rem;
    height: 2.5rem;
    max-width: 100%;
    border: none;
    border: solid 2px black;
    border-radius: 5px;

}

.commentPublish{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

#buttonFieldComment{
    margin-top: 1rem;
    height: 2.5rem;
    background-color: rgb(22, 87, 22);
    color: white;
    border: none;
    border: solid 2px white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: .4s ease;
}

#buttonFieldComment:hover{
    transform: scale(1.07);
}
.cardPost{
    margin: 5% 10% 5% 10%;
    padding: 10px;
    box-shadow: 0 0 1rem #0000002e;
    transition: .4s ease;
}

.cardPost:hover{
    transform: scale(1.01);
}

.thePost{
    display: flex;
    flex-direction: column;
}


.imgPublished{
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 40%;
}
#commented{
    margin-top: 2rem;
}
.commentInfo{

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 2rem;
    line-height: 0;
}

.thePic{
    margin-left: auto;
    margin-right: auto;
    width: 8rem;
    border-radius: 50%;
}

.theComment{
    display: flex;
}

.comment{
    flex-basis: 90%;
}

#eraseButton{
    background-color: #C40030;
}

a:visited{
    text-decoration: none;
    color: none;
}

.titlePost{
    font-weight: 600;
    font-size: 1rem;
    color: black;
}

.trash{
    color: #C40030;
    transition: .4s ease;
    cursor: pointer;
}

.trash:hover{
    transform: scale(1.15);
}
</style>
