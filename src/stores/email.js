import axios from 'axios'
import getEnv from '../utils/env'
import { defineStore, acceptHMRUpdate } from 'pinia'

const useEmailStore = defineStore('email', {
  state: () => ({
    loadingMailboxes: true,
    loadingMessages: true,
    loadingMessage: true,
    error: false,
    _mailboxes: [],
    _messages: [],
    _specialMailboxesIcons: {
      'INBOX': 'fa-solid fa-inbox',
      'Sent': 'fa-solid fa-paper-plane',
      'Drafts': 'fa-solid fa-file',
      'Junk': 'fa-solid fa-circle-exclamation',
      'Trash': 'fa-solid fa-trash-can',
      'Archive': 'fa-solid fa-archive'
    },
    // _draft: {
    //   from: '"Pommier Dimitri" <catchall@shokohsc.com>',
    //   to: undefined,
    //   cc: [],
    //   subject: undefined,
    //   message: undefined,
    //   attachments: []
    // },
    _query: undefined
  }),
  persist: {
    storage: sessionStorage,
    debug: true
  },
  getters: {
    mailboxes: state => state._mailboxes.filter(mailbox => 'INBOX' === mailbox.path || (0 < mailbox.messages || 0 < mailbox.unseen)),
    messages: state => state._messages,
    // draft: state => state._draft,
    query: state => state._query,
    unreadMailNumber: state => {
      let unread = 0
      state._mailboxes.forEach(mailbox => unread += mailbox.unseen)
      return unread
    }
  },
  actions: {
    async getMailboxes(params = {}, reset = true) {
      if (reset)
        this._mailboxes = []
      this.loadingMailboxes = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const url = window.location.protocol + '//' + getEnv('API_GATEWAY_HOST') + ':' + getEnv('API_GATEWAY_PORT') + '/email/mailbox'
        const response = await axios.get(url, {
          params,
          headers: {
            'Cache-Control': `public,max-age=60`
          }
        })
        response.data.forEach((mailbox, i) => {
          this._mailboxes.push({
            path: mailbox.path,
            messages: mailbox.messages,
            recent: mailbox.recent,
            unseen: mailbox.unseen,
            route: { name: 'Messages', params: { mailbox: mailbox.path }},
            icon: this._specialMailboxesIcons[mailbox.path] ? this._specialMailboxesIcons[mailbox.path] : false
          })
        })
        this.loadingMailboxes = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loadingMailboxes = false
      }
    },
    async getMessages(params = {}, reset = true) {
      if (reset)
        this._messages = []
      this.loadingMessages = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const url = window.location.protocol + '//' + getEnv('API_GATEWAY_HOST') + ':' + getEnv('API_GATEWAY_PORT') + '/email/message'
        const response = await axios.get(url, {
          params,
          headers: {
            'Cache-Control': `public,max-age=60`
          }
        })
        response.data.forEach((message, i) => {
          this._messages.push({
            uid: message.uid,
            flags: message.flags,
            bodyStructure: message.bodyStructure,
            envelope: message.envelope,
            bodyParts: message.bodyParts ? message.bodyParts: undefined,
            preview: message.preview,
            route: { name: 'Message', params: { mailbox: params.mailbox, uid: message.uid }}
          })
        })
        this.loadingMessages = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loadingMessages = false
      }
    },
    async getResults(reset = true) {
      if (reset)
        this._messages = []
      this.loadingMessages = true
      this.error = false
      const query = new URLSearchParams({ params: this._query })
      try {
        const url = window.location.protocol + '//' + getEnv('API_GATEWAY_HOST') + ':' + getEnv('API_GATEWAY_PORT') + '/email/results'
        const response = await axios.get(url, {
          params,
          headers: {
            'Cache-Control': `public,max-age=60`
          }
        })
        response.data.forEach((message, i) => {
          this._messages.push({
            uid: message.uid,
            flags: message.flags,
            bodyStructure: message.bodyStructure,
            envelope: message.envelope,
            bodyParts: message.bodyParts ? message.bodyParts: undefined,
            preview: message.preview,
            route: { name: 'Message', params: { mailbox: message.mailbox, uid: message.uid }}
          })
        })
        this.loadingMessages = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loadingMessages = false
      }
    },
    async clearQuery() {
      this._query = undefined
    },
    // async postMessage(params = {}) {
    //   this.loadingMessage = true
    //   this.error = false
    //   try {
    //     const url = window.location.protocol + '//' + getEnv('API_GATEWAY_HOST') + ':' + getEnv('API_GATEWAY_PORT') + '/email/message'
    //     const response = await axios.post(url, params)
    //     console.log(response);
    //     this.loadingMessage = false
    //     return
    //   } catch (e) {
    //     this.error = e.message || 'Error happened'
    //     console.error(e)
    //     this.loadingMessage = false
    //   }
    // },
    // async clearDraft() {
    //   this._draft = {
    //     from: '"Pommier Dimitri" <catchall@shokohsc.com>',
    //     to: undefined,
    //     cc: [],
    //     subject: undefined,
    //     message: undefined,
    //     attachments: []
    //   }
    // },
    // async flagMessage(params = {}) {
    //   this.error = false
    //   try {
    //     const url = window.location.protocol + '//' + getEnv('API_GATEWAY_HOST') + ':' + getEnv('API_GATEWAY_PORT') + '/email/message/flag'
    //     const response = await axios.post(url, params)
    //   } catch (e) {
    //     this.error = e.message || 'Error happened'
    //     console.error(e)
    //   }
    // },
    // async moveMessage(params = {}) {
    //   this.error = false
    //   try {
    //     const url = window.location.protocol + '//' + getEnv('API_GATEWAY_HOST') + ':' + getEnv('API_GATEWAY_PORT') + '/email/message/move'
    //     const response = await axios.post(url, params)
    //   } catch (e) {
    //     this.error = e.message || 'Error happened'
    //     console.error(e)
    //   }
    // },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmailStore, import.meta.hot))
}

export { useEmailStore }
