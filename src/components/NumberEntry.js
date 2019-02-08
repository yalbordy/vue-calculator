Vue.component('NumberEntry', {
  template: `
  <div id="number-entry" >
  <table>
  <tr><td @click.prevent="onclick('BS')">&lt;BS</td><td @click.prevent="onclick('/')">/</td><td @click.prevent="onclick('*')">*</td><td @click.prevent="onclick('-')">-</td></tr>
  <tr><td @click.prevent="onclick('7')">7</td><td @click.prevent="onclick('8')">8</td><td @click.prevent="onclick('9')">9</td><td @click.prevent="onclick('+')" rowspan="2">+</td></tr>
  <tr><td @click.prevent="onclick('4')">4</td><td @click.prevent="onclick('5')">5</td><td @click.prevent="onclick('6')">6</td></tr>
  <tr><td @click.prevent="onclick('1')">1</td><td @click.prevent="onclick('2')">2</td><td @click.prevent="onclick('3')">3</td><td @click.prevent="onclick('=')" rowspan="2">=</td></tr>
  <tr><td @click.prevent="onclick('0')" colspan="2">0</td><td @click.prevent="onclick('.')">.</td></tr>
  <tr><td @click.prevent="onclick('<')" colspan="2">&lt;</td><td @click.prevent="onclick('>')" colspan="2">&gt;</td></tr>
  </table>
  </div>`,
  name: 'NumberEntry',
  methods: {
    onclick(key) {
      console.log(key);
      this.$emit("inputNumber", key);
    }
  }
})