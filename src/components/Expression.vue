<template>
  <div id="expression" @click="act()">
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
    <Card :padding="2" :class="{activecard: active}">
    <p slot="title">No.{{ id+1 }}</p><p slot="extra">level:{{ level }}</p>
    <table :class="{activate: active}">
      <tr>
        <td v-for="e in exp" class="e">
          <i v-if="e!=='Q'" >{{ e }}</i>
          <transition name="bounce-wrong">
            <i v-if="answered && e=='Q'" class="wrong" key="on">{{ inputAnswer }}</i>
          </transition>

          <i v-if="!answered && e=='Q'"><div class="input">{{inputAnswer}}</div></i>
        </td>
      </tr>
    </table>
    </Card>
    </Col>
    </Row>
  </div >
</template >

  <script>
import seed from "../seed";
export default {
  name: "Expression",
  inject: ["goodAnswer", "badAnswer"],
  provide: function() {
    return {
      setLevel: this.setLevel
    };
  },
  props: { id: Number },
  data() {
    return {
      inputAnswer: "",
      answer: "",
      answered: false,
      level: 0,
      difficult: 0,
      active: false
    };
  },
  computed: {
    exp() {
      let level_def =
        seed.level_define[this.difficult][Math.min(9, this.level)];
      let ops = level_def.ops;
      let signs = level_def.sign;

      let ret = this.shakeNumber(ops);

      let result = eval(ret.join(""));
      let twoZero = ret.filter(function(item, index, array) {
        return item === 0;
      }).length;

      while (result < 0 || parseInt(result) < result || twoZero > 1) {
        ret = this.shakeNumber(ops);
        result = eval(ret.join(""));
        twoZero = ret.filter(function(item, index, array) {
          return item === 0;
        }).length;
      }
      let sign =
        signs.length === 1
          ? signs[0]
          : signs[parseInt((Math.random() * 100) % signs.length)];
      ret[ret.length] = sign;

      let r = parseInt(Math.random() * 5);
      if (r === 0) r = 1;
      if (sign === ">") {
        if (result - r < 0) result -= 1;
        else result -= r;
      }
      if (sign === "<") result += r;

      ret[ret.length] = result;

      r = parseInt((Math.random() * 1000) % ret.length);
      if (r === 0) r = ret.length - 1;
      if (sign === ">" || sign === "<") {
        r = ret.length - 2;
      }
      console.log("r::" + r);
      while (
        (r === ret.length - 2 && signs.length === 1) ||
        (r < ret.length - 2 && r % 2 === 1 && ops.length === 1)
      ) {
        r = parseInt((Math.random() * 1000) % ret.length);
      }
      console.log(ret.join(" "));
      this.answer = ret[r];
      ret[r] = "Q";
      console.log(ret.join(" "));
      console.log("answer:" + this.answer);
      return ret;
    },

    getInputId() {
      return "input_" + this.id;
    }
  },
  methods: {
    act() {
      this.active = true;
      this.$emit("activate", this.id);
    },
    setLevel(level, difficult) {
      this.level = level;
      this.difficult = difficult;
      this.answered = false;
      this.inputAnswer = "";
      this.answer = "";
    },
    submitAnswer() {
      this.answered = true;
      if (this.answer == this.inputAnswer) {
        this.goodAnswer(this);
      } else {
        this.badAnswer(this);
      }
    },
    setInputAnswer(key) {
      if (this.answered) return;

      if (key === "BS") {
        this.inputAnswer = this.inputAnswer.slice(0, -1);
      } else if (
        key === "=" &&
        this.answer === "=" &&
        this.inputAnswer === "="
      ) {
        this.submitAnswer();
      } else if (key === "=" && this.answer != "=" && this.inputAnswer != "") {
        this.submitAnswer();
      } else {
        this.inputAnswer += key;
      }
    },
    shakeNumber(ops) {
      let digit =
        seed.level_define[this.difficult][Math.min(9, this.level)].digit;
      let opCnt = parseInt((Math.random() * 100) % 3);
      if (opCnt === 0) opCnt = 1;

      let num1 = parseInt((Math.random() * 10000) % Math.pow(10, digit));
      if (num1 === 0)
        num1 = parseInt((Math.random() * 10000) % Math.pow(10, digit));

      let ret = [];
      ret[0] = num1;
      for (var i = 0; i < opCnt; i++) {
        num1 = ret[ret.length - 1];
        let op =
          ops.length === 1
            ? ops[0]
            : ops[parseInt((Math.random() * 100) % ops.length)];
        ret[ret.length] = op;
        let num2 = parseInt((Math.random() * 10000) % Math.pow(10, digit));
        if (num2 === 0)
          num2 = parseInt((Math.random() * 10000) % Math.pow(10, digit));
        if (op === "*" && num2 > 10) num2 = parseInt(num2 / 10);
        if (op === "*" && num2 == 0)
          num2 = parseInt((Math.random() * 100) % 8) + 1;
        if (op === "*" && num1 > 10) ret[ret.length - 2] = parseInt(num1 / 10);
        if (op === "*" && num1 == 0)
          num1 = parseInt((Math.random() * 100) % 8) + 1;

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
        ret[j + 1] = tmpN * (parseInt((Math.random() * 100) % 8) + 1);
      }
      // let result = eval(ret.join(''));
      // return result;
      console.log("shakeNumber:" + ret);
      return ret;
    }
  }
};
</script>

<style>
table {
  align-content: center;
  margin-top: 10px;
  width: 450px;
  border: 0px solid #aaa;
}

.activecard {
  background: #f7f7fc;
  border-color: #91d5ff;
}
.activate {
  border: 4px solid #91d5ff;
}
tr {
  width: 450px;
}
td {
  width: 50px;
  height: 50px;
  border: 1px solid #aaa;
  text-align: center;
  font-size: xx-large;
}
td.e {
  border: 0px;
}
.input {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #ffffff;
  border: 1px solid #aaa;
  font-size: xx-large;
  width: 90px;
  height: 50px;
}
.wrong {
  color: red;
}
</style>