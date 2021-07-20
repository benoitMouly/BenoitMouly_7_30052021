<template>
<div class="mainBox">
    <div class="commentInfo">
        <div class="authorPic">
            <img :src="commentitem.user.picture" class="thePic"/>
        </div>
        <div class="authorName">
            <h5><a :href="$router.resolve({name: 'userProfile', params: { id : this.commentitem.user.id}}).href">{{commentitem.user.username}}</a></h5>
        </div>
    </div>
        <div class="theComment">
            <div class="comment">
                <p>{{commentitem.content}}</p>
            </div>
            <div class="buttonCommentErase">
                <font-awesome-icon icon="trash" class="trash" v-if="currentUser.userRight || currentUser.userId == commentitem.AuthorId" @click= "eraseComment()"/>
            </div>
        </div>    
</div> 

</template>

<script>
import axios from 'axios'


export default{
    name:'onecomment',
    props:['commentitem'],
    components:{
    
    },
    data(){
        return{
            posts: [],
            comments: [],
            comment:[],
            currentUser: {},
        }
    },
     methods:{

////// CURRENT USER
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


////// ERSARE COMMENT
      eraseComment(){
         const answer = window.confirm("Voulez vous vraiment supprimer ce commentaire ?");
         if(answer){
          axios.delete('http://localhost:8081/api/comments/'+this.commentitem.id, {
            headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
          })
        .then(reponse => {
            console.log(reponse)
            window.location.reload();
           
        })
        .catch(e => {
            console.log(e)
        })
      }
      }
    },

    mounted(){
        this.getCurrentUser();
    }
}

</script>

<style scoped>

.mainBox{
    background: #ffe5e3;
    border-radius: 3px;
    padding: 8px;
    margin-top: 2%;
    max-width: 100%;
}


.commentInfo{

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 2rem;
    margin-top: 0;
}

.thePic{
    margin-left: auto;
    margin-right: auto;
    width: 2rem;
    border-radius: 50%;
    overflow: hidden;
    
}

.theComment{
    display: flex;
    justify-content: space-around;

}

.comment{
    flex-basis: 90%;
}

#eraseButton{
    background-color: #C40030;
}

.trash{
    color: #C40030;
    transition: .4s ease;
    font-size: 1.1rem;
    cursor: pointer;
}

.trash:hover{
    transform: scale(1.15);
}

</style>