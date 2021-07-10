import { ref } from 'vue'

const getTags = (posts) => {
  const tempTags = new Set()
  const tags = ref([])

  posts.forEach(item => {
    item.tags.forEach(tag => tempTags.add(tag))
  })
  
  tags.value = [...tempTags]
  return { tags }
}

export default getTags