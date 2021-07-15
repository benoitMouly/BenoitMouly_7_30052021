<template>
    <div class="commentPublish">
                <input type="text" class="commentField"
                name="name" required minlength="4" maxlength="800" size="auto" placeholder="{Ajoutez un Commentaire...}" v-model="content">
                <button id="buttonFieldSend" @click="addComment()">Envoyer</button>
            </div>
</template>

<script>
import axios from 'axios'
import items from './PostProp.vue'

export default{
    name: 'addnewcomment',
    props:['ncomment'],
    components:{
        items
    },

data() {
    return{
        comments:[],
        content: '',
        idPost: null
    };
},
methods: {
 addComment() {
        

        
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
            this.content = reponse.data.id;
            console.log(reponse.data.id)
            this.item.user = {username: this.item.user.Username,
            image: this.item.user.image}
        })
        .catch(e => {
            console.log(e)
        })
}
}}
</script>
