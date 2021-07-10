<template>
  <!-- <div v-if="error">{{ error }}</div> -->
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" required v-model="title">
    <label>Body</label>
    <textarea v-model="body"></textarea>
    <div>
      <label>Add Tags - (Press  ENTER key to add the tag)</label>            
      <input type="text" v-model="tag" @keydown.prevent.enter="addTags">       
      <div v-for="tag in tags" :key="tag" class="pill">
        #{{ tag }}
      </div>
    </div>
    <div class="submit">
      <button @click="submitForm">Add Post</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// challenge
//   - add a submit event handler to the form
//   - inside the handler, make a POST request to add a new post to db.json
//   - try using async & await to make the request
//   - the endpoint is /posts to add a new post
export default {
  name: 'Create',
  setup(){
    let title = ref('')
    let body = ref('')
    let tag = ref('')
    let tags = ref([])
    const router = useRouter()

    const addTags = () => {
      if(!tags.value.includes(tag.value))
        tag.value = tag.value.replace(/\s/g,'') // remove the whitespace
        tags.value.push(tag.value)
      
      tag.value = ''
    }
    
    const handleSubmit = async () => {
      const post = {
        id: Math.floor(Math.random() * 1000),
        title: title.value,
        body: body.value,
        tags: tags.value
      }
      console.log(post)

      await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(post)
      })
      router.push({ name: 'Home' })
    }

    return { title, body, tag, tags, addTags, handleSubmit }
  }
}
</script>

<style>
form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>