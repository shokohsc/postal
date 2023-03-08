import axios from 'axios'
import getEnv from '../utils/env'
import { defineStore, acceptHMRUpdate } from 'pinia'
import reverse from 'lodash/reverse'

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
    _draft: {
      sender: "",
      recipients: [],
      subject: "",
      message: "",
      attachments: []
    }
  }),
  persist: {
    storage: sessionStorage,
    debug: true
  },
  getters: {
    mailboxes: state => state._mailboxes,
    messages: state => reverse(state._messages),
    draft: state => state._draft
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
            // headers: message.headers ? message.headers: undefined,
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
    }
  },
  async postMessage(e) {
    console.log(e);
    console.log('postMessage');
    this.loadingMessage = true
    this.error = false
    try {
      const url = window.location.protocol + '//' + getEnv('API_GATEWAY_HOST') + ':' + getEnv('API_GATEWAY_PORT') + '/email/message'
      await axios.post(url, this.draft, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.loadingMessage = false
      await this.clearDraft()
      return
    } catch (e) {
      this.error = e.message || 'Error happened'
      console.error(e)
      this.loadingMessage = false
    }
  },
  async clearDraft() {
     this._draft = {
      sender: "",
      recipients: [],
      subject: "",
      message: "",
      attachments: []
    }

    return
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmailStore, import.meta.hot))
}

export { useEmailStore }
