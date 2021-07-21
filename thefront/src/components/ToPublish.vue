<template>
  <div id="toPublish">
    <div id="toPublish2">
        <div class ="titleBloc">
          <p>Publier un nouveau post</p>
        </div>
        <div class="publishBloc">
            <div class="titlePost">
                <input type="text" id="nameField" name="name" required minlength="4" maxlength="80" size="auto" placeholder="Ajoutez un titre..." v-model="post.title" />
            </div>
            <div class="chooseFile">
                <input @change="onFileSelected" type="file" id="fileField" name="file" required ref="file"
                accept="image/png, image/jpeg, image/bpm, image/jpg, image/gif">
            </div>
            <div class="form-group error">
              <div v-if="message" role="alert"><p>{{message}}</p></div>
            </div>
            <div class="publish">
                <button id="buttonFieldSend" @click="createPost">Publier <font-awesome-icon icon="arrow-circle-right"/></button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default{
    name: "topublish",
    props:['publish'],
    data() {
    return {
      post: {

        id: null,
        title: "",
        description: "",
        selectedFile: null,
        identification: null,
        username: null,

        
      },
      message:'',
      loading: false,
      submitted: false
    };
  },
  methods: {

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    createPost(e) {
      const fd = new FormData();
      fd.append("image", this.selectedFile)
      fd.append("title", this.post.title)

      if (this.selectedFile == null && this.message == null){
        e.preventDefault()
        alert("Veuillez selectionner un fichier")
      }
      else{
      axios.post('http://localhost:8081/api/posts', fd, {
        headers: {
          'Content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
    
        .then(reponse => {
          
          this.selectedFile = reponse.data.id;
          window.location.reload();

        },
          error => {
            this.loading = false;
            this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          })
        .catch(e => {
          console.log(e);
        });
      }
    },
    
    newPost() {
      this.submitted = false;
      this.post = {};
      console.log('send');
    }
  }
}
</script>

<style scoped>

#toPublish2{
  padding: 10px;
  box-shadow: 0 0 1rem #0000002e;
}

.titleBloc{
  color: black;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 10%;
}

.publishBloc{
  border-top: none;
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3%;
  row-gap: 1.5em;
}

.titlePost{
  flex: 100%;
  align-self: flex-start;;
}

#nameField{
  border: none;
  border-bottom: solid 2px black;
}

.chooseFile, .publish{
  flex: 1;
  text-align: right;
}

.chooseFile{
  display: flex;
  justify-self: flex-start;
}

.error{
  color: aliceblue;
  background: #C40030;
  text-align: center;
  font-weight: bold;
}
</style>