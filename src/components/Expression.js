Vue.component('Expression', {
  template: `
  <div id="expression" @click="act()">
  No.{{id+1}}  level:{{level+1}}
  <table :class="{activate: active, loading:loading}">
  <tr>
  <td v-for="e in exp" class="e">
  <i v-if="e!=='Q'" >{{e}}</i>
  <transition name="bounce-wrong">
    <i v-if="answered && e=='Q'" class="wrong" key="on">{{inputAnswer}}</i>
  </transition>

  <i v-if="!answered && e=='Q'"><input :ref="getInputId" v-model="inputAnswer" ></i>
  </td>
  </tr>
  </table>
  </div>`,
  inject: ['goodAnswer', 'badAnswer'],
  provide: function () {
    return {
      setLevel: this.setLevel,
    }
  },
  name: "Expression",
  props: { id: Number },
  data() {
    return {
      inputAnswer: '',
      answer: '',
      answered: false,
      loading: false,
      level: 0,
      active: false,
    }
  },
  updated() {
    // this.loading = false;
    if (typeof this.$refs[this.getInputId][0] != "undefined" && this.active)
      this.$refs[this.getInputId][0].focus();
  },
  computed: {
    exp() {
      let ops = level_operators[this.level];
      let signs = level_equal_sign[this.level];


      let ret = this.shakeNumber(ops);
      let result = eval(ret.join(''));

      while (result < 0) {
        ret = this.shakeNumber(ops);
        result = eval(ret.join(''));
      }
      let sign = signs.length === 1 ? signs[0] : signs[parseInt(Math.random() * 100 % signs.length)];
      ret[ret.length] = sign;

      let r = parseInt(Math.random() * 10);
      if (r === 0) r = 1;
      if (sign === ">") {
        if (result - r < 0)
          result -= 1;
        else
          result -= r;
      }
      if (sign === "<") result += r;

      ret[ret.length] = result;

      r = parseInt(Math.random() * 1000 % ret.length);
      if (r === 0) r = ret.length - 1;
      if ((sign === ">") || sign === "<") {
        r = ret.length - 2;
      }
      while ((r === ret.length - 2 && signs.length === 1) ||
        (r < ret.length - 1 && r % 2 === 1 && ops.length === 1)
      ) {
        r = parseInt(Math.random() * 1000 % ret.length);
      }
      console.log(ret.join(' '));
      this.answer = ret[r];
      ret[r] = 'Q';
      console.log(ret.join(' '));
      console.log('answer:' + this.answer);
      return ret;
    },

    getInputId() {
      return 'input_' + this.id;
    }
  },
  methods: {
    act() {
      this.active = true;
      this.$emit("activate", this.id);
    },
    setLevel(level) {
      this.level = level;
      this.loading = false;
      this.answered = false;
      this.inputAnswer = '';
      this.answer = '';
    },
    submitAnswer() {
      this.answered = true;
      if (this.answer == this.inputAnswer) {
        this.loading = true;
        this.goodAnswer(this);
      } else {
        this.badAnswer(this);
      }
    },
    setInputAnswer(key) {
      if (this.answered) return;

      if (key === "BS") {
        this.inputAnswer = this.inputAnswer.slice(0, -1);
      } else if (key === "=" && this.answer === "=" && this.inputAnswer === "=") {
        this.submitAnswer();
      } else if (key === "=" && this.answer != "=" && this.inputAnswer != "") {
        this.submitAnswer();
      } else {
        this.inputAnswer += key;
      }
    },
    shakeNumber(ops) {
      let digit = level_digit[this.level];
      let opCnt = parseInt(Math.random() * 100 % 3);
      if (opCnt === 0) opCnt = 1;

      let num1 = parseInt(Math.random() * 10000 % Math.pow(10, digit));
      if (num1 === 0) num1 = parseInt(Math.random() * 10000 % Math.pow(10, digit));

      let ret = []
      ret[0] = num1;
      for (var i = 0; i < opCnt; i++) {
        num1 = ret[ret.length - 1];
        let op = ops.length === 1 ? ops[0] : ops[parseInt(Math.random() * 100 % ops.length)];
        ret[ret.length] = op;
        let num2 = parseInt(Math.random() * 10000 % Math.pow(10, digit));
        if (num2 === 0) num2 = parseInt(Math.random() * 10000 % Math.pow(10, digit));
        if (op === "*" && num2 > 10) num2 = parseInt(num2 / 10);
        if (op === "*" && num2 == 0) num2 = (parseInt(Math.random() * 100 % 8) + 1);
        if (op === "*" && num1 > 10) ret[ret.length - 2] = parseInt(num1 / 10);
        if (op === "*" && num1 == 0) num1 = (parseInt(Math.random() * 100 % 8) + 1);

        ret[ret.length] = num2;

      }
      var j = ret.length - 2;
      if (ret[j] === "/") {
        var tmpN = 1;
        while (ret[j] === "/") {
          var n = ret[j + 1];
          if (n > 10) {
            n = n % 10;
            ret[j + 1] = n;
          }
          if (n == 0) {
            ret[j + 1] = 2;
          }

          tmpN = n * tmpN;
          j -= 2;
        }
        ret[j + 1] = tmpN * (parseInt(Math.random() * 100 % 8) + 1);
      }
      // let result = eval(ret.join(''));
      // return result;
      return ret;
    },
  }
})