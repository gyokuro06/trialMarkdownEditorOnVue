<template>
  <div id="markdown">
    <ui-textfield
      outlined
      input-type="textarea"
      class="editor"
      v-model="memo.body"
      @keyup.enter="autosave"
      placeholder="Input something you want to memo...">
    </ui-textfield>
    <div class="preview" v-html="compiledMarkdown"></div>
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
// import _ from '@/lib/debounce'

const toolbar = [
  [
    { header: [false, 1, 2, 3, 4, 5, 6] },
    { font: [] },
    { size: [] },
    { lineheight: [] }
  ],
  ['bold', 'italic', 'underline', { color: [] }, { background: [] }],
  [
    { align: '' },
    { align: 'center' },
    { align: 'right' },
    { align: 'justify' }
  ],
  [
    { list: 'ordered' },
    { list: 'bullet' },
    { indent: '+1' },
    { indent: '-1' },
    'blockquote',
    'emoji'
  ],
  ['link', 'image', 'video'],
  ['strike', { script: 'super' }, { script: 'sub' }, 'divider'],
  ['clean', 'undo', 'redo'],
];

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
  name: 'markdown',
  data() {
    return {
      memo: { id: 0, body: '' },
      markdownIt: md,
      toolbar,
    }
  },
  computed: {
    compiledMarkdown() {
      console.log("MdEditor: compiledMarkdown computed.")
      return this.markdownIt.render(this.memo.body);
    }
  },
  methods: {
    autosave() {
      if (this.memo.id === 0) this.memo.id = this.$store.getters.usingId;
      console.log("MdEditor: autosave.(%d, %s)", this.memo.id, this.memo.body);

      this.$store.commit("save", this.memo);
      // _.debounce(function() {
      //   console.log("MdEditor: debounce.");
      //   this.$store.commit("save", this.memo);
      // }, 500);
    }
  }
}
</script>

<style scoped>
#markdown {
  display: flex;
  height: calc(50vh);
  min-height: 300px;
  overflow: scroll;
}

.editor, .preview {
    flex: 1;
    padding: 16px;
    height: 100%;
    overflow: scroll;
    text-align: left;
}
</style>