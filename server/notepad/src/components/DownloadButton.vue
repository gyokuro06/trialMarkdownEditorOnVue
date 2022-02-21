<template>
  <div id="button-area">
    <div id="download">
      <ui-button outlined @click="downloadMD">Download Markdown file</ui-button>
      <ui-button outlined @click="downloadHTML">Download HTML file</ui-button>
    </div>
    <div id="save">
      <ui-button raised @click="save">Save</ui-button>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import sanitizer from 'markdown-it-sanitizer'
import emoji from 'markdown-it-emoji'
import katex from '@iktakahiro/markdown-it-katex'
import resizeImg from 'markdown-it-imsize'
import checkbox from 'markdown-it-checkbox'
import sub from 'markdown-it-sub'
import ins from 'markdown-it-ins'
import footnote from 'markdown-it-footnote'
import abbr from 'markdown-it-abbr'

var isSaved = false;
const md = new markdownIt ({
                    highlight: function(code, lang) {
                      return hljs.highlightAuto(code, [lang]).value;
                    },
                    html: true,
                    linkify: true,
                    breaks: true,
                    typographer: true
                  })
                  .use(katex, { throwOnError: false, errorColor: "#cc0000"})
                  .use(sanitizer)
                  .use(emoji)
                  .use(resizeImg, { autofill: true })
                  .use(checkbox)
                  .use(sub)
                  .use(ins)
                  .use(footnote)
                  .use(abbr);

export default {
  name: 'download-button',
  data() {
    return {
      memo: { id: 0, body: '' },
      markdownIt: md
    }
  },
  beforeUnmount() {
    if (!isSaved) {
      console.log("DownloadBtn: Leave before save.");
    }
  },
  computed: {
    html() {
      console.log("DownloadBtn: html computed.");
      return this.markdownIt.render(this.memo.body)
    }
  },
  methods: {
    getMemo() {
      const id = this.$store.getters.usingId;
      this.memo = this.$store.getters.usingMemo(id);
    },
    downloadMD() {
      this.download('md')
    },
    downloadHTML() {
      this.download('html')
    },
    download(type) {
      this.getMemo();
      let text = (type === 'md') ? this.memo.body : this.html;
      console.log("DownloadBtn: download method.(%s, %s)", type, text);
      var blob = new Blob([ text ], {'type': 'text/plain'});
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'markdown.' + type;
      link.click();
    },
    save() {
      this.getMemo();
      console.log("DownloadBtn: save method.(%s)", this.memo.body);
      this.$store.commit("save", this.memo);
      isSaved = true;
    }
  }
}
</script>

<style scoped>
.button-area {
  height: 60px;
}

#download {
  text-align: left;
}

#save {
  text-align: center;
}
</style>