<template>
  <div>
    <do-list />
    <done-list />  
  </div>
</template>



<script>
import doList from "./components/doList.vue"
import doneList from "./components/doneList.vue"

export default {
  data() {
    return {
      msg: "hello"
    }
  },
  components: {
    doList,
    doneList
  }  
}
</script>