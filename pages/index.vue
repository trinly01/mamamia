<template>
  <div>
    <v-text-field @keyup.enter="send" v-model="input" placeholder="message" />
    <v-btn @click="send">
      send
    </v-btn>
    <ul>
      <li v-for="m in messages" :key="m.id">
        {{ m.msg }}
      </li>
    </ul>
  </div>
</template>

<script>
import { onSnapshot } from 'firebase/firestore'

export default {
  name: 'MamaMia',
  data: () => ({
    input: '',
    unsub: null,
    messages: []
  }),
  mounted () {
    this.unsub = onSnapshot(this.$fire.firestore.collection('messages'), (doc) => {
      doc.docChanges().forEach((c) => {
        if (c.type === 'added') {
          this.messages.unshift({
            ...c.doc.data(),
            type: c.type,
            id: c.doc.id
          })
        }
      })
    })
  },
  destroyed () {
    if (this.unsub) { this.unsub() }
  },
  methods: {
    send () {
      if (!this.input) { return }
      this.$fire.firestore.collection('messages').add({
        msg: this.input
      })
      this.input = ''
      this.$axios.$post('http://localhost:5001/mamamia-87e6a/us-central1/send', {
        msg: this.input
      })
    }
  }
}
</script>
