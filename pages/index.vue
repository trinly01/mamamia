<template>
  <div>
    <v-text-field v-model="input" placeholder="message" @keyup.enter="send" />
    <v-btn @click="send">
      send
    </v-btn>
    {{ messages }}
    <ul>
      <li v-for="m in messages" :key="m.id">
        {{ m.msg }}
      </li>
    </ul>
  </div>
</template>

<script>
import { onSnapshot } from 'firebase/firestore'
// import { httpsCallable } from 'firebase/functions'

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
    async send () {
      if (!this.input) { return }
      await this.$fire.firestore.collection('messages').add({
        msg: this.input
      })
      // const functions = this.$fireModule.functions()
      // const send = httpsCallable(functions, 'send')
      // window.console.log(await send({
      //   msg: this.input
      // }))
      this.input = ''
      // this.$axios.$post('http://localhost:5001/mamamia-87e6a/us-central1/send', {
      //   msg: this.input
      // })
    }
  }
}
</script>
