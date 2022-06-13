<template>
  <div class="chatapp">
    <thread-section></thread-section>
    <message-section></message-section>
  </div>
</template>

<script>
import ThreadSection from "~/components/Chat/ThreadSection";
import MessageSection from "~/components/Chat/MessageSection";
import {mapActions} from "vuex";

export default {
  name: "ChatPage",
  components: {MessageSection, ThreadSection},
  beforeMount() {
    this.getAllMessages()
  },
  methods: mapActions('chat/chatModule', [
    'getAllMessages'
  ])
}
</script>
