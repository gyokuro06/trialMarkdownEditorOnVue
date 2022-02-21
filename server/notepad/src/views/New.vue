<template>
  <div id="new">
    <h1 class="title">New memo</h1>
    <DownloadBtn></DownloadBtn>
    <MdEditor></MdEditor>
  </div>
</template>

<script>
import DownloadBtn from '../components/DownloadButton.vue'
import MdEditor from '../components/MarkdownEditor.vue'

export default {
  name: 'new',
  // data() {
  //   return {
  //     memo: { id: Number, body: String }
  //   }
  // },
  components: {
    DownloadBtn,
    MdEditor
  },
  mounted() {
    const id = this.$store.getters.maxId + 1;
    this.$store.commit("lockId", id);
    console.log("New mounted.(%d)", id);
  }
}
</script>

<style scoped></style>