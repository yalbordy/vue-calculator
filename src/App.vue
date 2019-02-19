<template>
  <div id="app" @keypress.exact="onkeypress">
    <Divider />

    <Row type="flex" justify="center" align="middle">
        <Col span="2">
            <Row justify="start" align="top"><Col span="24"><i style="font-size:small;height:50px">Time:</i></Col></Row>
            <Divider />
            <Row justify="start" align="bottom"><Col span="24"><i style="font-size:small;height:50px">Score:</i></Col></Row>
        </Col>
        <Col span="4">
            <Row justify="start" align="top"><Col span="24">
            <div class="bounce">
              <transition name="bounce">
                <span style="font-size:xx-large;height:50px" v-if="totalTimeFlag" :class="{wrong: totalTime<10}" key="on">{{ totalTime }}</span>
                <span style="font-size:xx-large;height:50px" v-else :class="{wrong: totalTime<10}" >{{ totalTime }}</span>
              </transition>
            </div>
            </Col>
            </Row>
            <Divider />
            <Row justify="start" align="bottom"><Col span="24" style="height:50px">
            <i style="font-size:xx-large">{{ score }}</i>
            </Col>
            </Row>
        </Col>
        <Col span="2">
            <Row justify="start" align="top"><Col span="24"><i style="font-size:small;height:50px">Total Win:</i></Col></Row>
            <Divider />
            <Row justify="start" align="bottom"><Col span="24"><i style="font-size:small;height:50px">Life:</i></Col></Row>
        </Col>
        <Col span="4">
            <Row justify="start" align="top"><Col span="24"><Badge :count="win"><span style="font-size:xx-large">{{ totalWin }}</span></Badge></Col></Row>
            <Divider />
            <Row justify="start" align="bottom"><Col span="24" style="height:50px">
                <div class="in-out-translate-demo-wrapper" style="font-size:xx-large">
                  <transition name="in-out-translate-fade" mode="in-out">
                    <span v-if="lifeFlag" key="on">{{ life }}</span>
                    <span v-else key="off">{{ life }}</span>
                  </transition>
                </div>
            </Col></Row>
        </Col>
        <Col span="4"><span :class="icon"></span></Col >
    </Row>

    <Row type="flex" justify="center" align="middle">
      <Col span="2">
        <i style="font-size:small">Level:</i>
      </Col>
      <Col span="4">
        <div class="in-out-translate-demo-wrapper">
          <transition name="in-out-translate-fade" mode="in-out">
            <span style="font-size:xx-large" v-if="levelFlag" key="on">{{ level }}</span>
            <span style="font-size:xx-large" v-else key="off">{{ level }}</span>
          </transition>
        </div>
      </Col>
      <Col span="10"><Rate v-model="level" disabled :count="10" allow-half /></Col>
    </Row >
<Divider />
     <Row type="flex" justify="center" align="middle">
       
      <div v-if="gameOver">
        <h1 style="color:red" v-show="gameStatusChanged">Game Over!</h1>
        <Button type="primary" size="large" @click="newGame">Start</Button>
      </div>
      <div v-else>
        <div v-for="expId in expressionsIdx">
          <expression :id='expId' :ref='expId' @activate="activate" />
        </div>

        <Affix :offset-bottom="20">
        <Divider />
        <NumberEntry @inputNumber="onInputNumber" />
        </Affix>
      </div>
      
    </Row >
  </div >
</template >

  <script>
import seed from "./seed";
import Expression from "@/components/Expression";
import NumberEntry from "@/components/NumberEntry";

export default {
  name: "App",
  provide: function() {
    return {
      goodAnswer: this.goodAnswer,
      badAnswer: this.badAnswer
    };
  },
  components: {
    expression: Expression,
    NumberEntry: NumberEntry
  },
  data() {
    return {
      gameOver: true,
      gameStatusChanged: false,
      totalTime: seed.TOTAL_TIME,
      totalTimeFlag: false,
      life: seed.TOTAL_LIFE,
      lifeFlag: false,
      level: 0,
      levelFlag: false,
      score: 0,
      win: 0,
      totalWin: 0,
      shiftKey: false,
      activeIdx: 0,
      scoreLevel: [
        10,
        100,
        1000,
        10000,
        100000,
        1000000,
        10000000,
        100000000,
        1000000000,
        10000000000
      ],
      iconSet: [],
      expressionsIdx: [0, 1, 2, 3, 4],
      timer: null
    };
  },
  computed: {
    lifeIcon() {
      let ret = "";
      for (var i = 0; i < this.life; i++) {
        ret += '<i class="far fa-plus-square fa-2x"></i>';
      }
      return ret;
    },
    icon() {
      let size = parseInt(this.totalTime % seed.iconSize.length);
      return this.iconSet[this.level] + " " + seed.iconSize[size];
    }
  },
  mounted() {
    let r = parseInt((Math.random() * 100) % 2);
    this.iconSet = seed.iconSets[r];
  },
  updated() {
    if (this.gameStatusChanged) {
      this.activate(this.activeIdx);
      this.gameStatusChanged = false;
    }
  },
  methods: {
    info(title, desc) {
      this.$Notice.info({
        title: title,
        desc: desc
      });
    },
    success(title, desc) {
      this.$Notice.success({
        title: title,
        desc: desc
      });
    },
    warning(title, desc) {
      this.$Notice.warning({
        title: title,
        desc: desc,
        duration: 5
      });
    },
    error(title, desc) {
      this.$Notice.error({
        title: title,
        desc: desc,
        duration: 8
      });
    },
    newGame() {
      this.gameOver = false;
      this.gameStatusChanged = true;
      this.totalTime = seed.TOTAL_TIME;
      this.life = seed.TOTAL_LIFE;
      this.level = 0;
      this.score = 0;
      this.win = 0;
      this.totalWin = 0;
      this.shiftKey = false;
      this.activeIdx = 0;

      this.$Loading.config({
        color: "#5cb85c",
        failedColor: "#f0ad4e",
        height: 25
      });
      this.$Loading.start();
      this.$Loading.update(0);
      this.$Notice.config({
        top: 10,
        duration: 1
      });

      this.timer = setInterval(() => {
        this.totalTime -= 1;
        this.checkGame();
        this.$Loading.update((1 - this.totalTime / seed.TOTAL_TIME) * 100);
        if (this.totalTime < 10 && this.totalTime > 0)
          this.totalTimeFlag = !this.totalTimeFlag;
      }, 1000);
      // this.activate(this.activeIdx);
    },
    checkGame() {
      if (this.totalTime <= 0 || this.life <= 0) {
        this.gameOver = true;
        this.$Notice.info({
          title: "Gmae Over",
          render: h => {
            return h("h1", [
              "Score: ",
              this.score,
              h("br"),
              "Level:",
              this.level
            ]);
          },
          duration: 0
        });
        clearInterval(this.timer);
      }
      if (this.totalTime % 60 === 0) {
        let m = this.totalTime / 60;
        if (m > 1) this.warning("Last " + m + " minutes", "");
        else if (m == 1) this.warning("Last 1 minute", "");
      }
      if (this.totalTime == 10) {
        this.warning("10 seconds", "");
      }
    },
    activate(idx) {
      this.activeIdx = idx;
      console.log("activate: " + idx);
      for (let i in this.expressionsIdx) {
        if (i != this.activeIdx) {
          this.$refs[i][0].$data.active = false;
        } else {
          this.$refs[i][0].$data.active = true;
          // this.onInputNumber(''); //set focus
        }
      }
    },
    onInputNumber(key) {
      // console.log("App catch:" + key + " active:" + this.activeIdx);
      this.$refs[this.activeIdx][0].setInputAnswer(key);
    },
    getExpression(vmExp) {
      let exp = "";
      for (let i in vmExp.exp) {
        if (vmExp.exp[i] === "Q") {
          exp += vmExp.answer;
        } else {
          exp += vmExp.exp[i];
        }
      }
      return exp;
    },
    goodAnswer: function(vmExp) {
      this.success(this.getExpression(vmExp), "");
      this.win += 1;
      this.totalWin += 1;
      // let bonus = Number.parseInt(this.win / 10);
      this.score += this.scoreLevel[this.level] / 10 * 1;
      if (this.score > this.scoreLevel[this.level]) {
        this.level += 1;
        this.levelFlag = !this.levelFlag;
        this.info("level up!", "New level is " + (this.level + 1));
      }
      vmExp.setLevel(this.level);
    },
    badAnswer: function(vmExp) {
      this.error(this.getExpression(vmExp), "");
      this.win = 0;
      this.life -= 1;
      this.lifeFlag = !this.lifeFlag;

      let idx = this.activeIdx + 1;
      if (idx >= this.expressionsIdx.length) {
        idx = 0;
      }
      this.activate(idx);
    },
    onkeyup: function(event) {
      console.log("keyup-keycode  ::" + event.keyCode);
      if (event.keyCode === 16) {
        this.shiftKey = false;
        return;
      }
      if (this.shiftKey && event.keyCode === 186) {
        this.shiftKey = false;
        this.onInputNumber("*");
        return;
      }
      if (this.shiftKey && event.keyCode === 187) {
        this.shiftKey = false;
        this.onInputNumber("+");
        return;
      }
      if (this.shiftKey && event.keyCode === 188) {
        this.shiftKey = false;
        this.onInputNumber("<");
        return;
      }
      if (this.shiftKey && event.keyCode === 189) {
        this.shiftKey = false;
        this.onInputNumber("=");
        return;
      }
      if (this.shiftKey && event.keyCode === 190) {
        this.shiftKey = false;
        this.onInputNumber(">");
        return;
      }
    },
    onkeydown: function(event) {
      if (event.keyCode === 16) {
        this.shiftKey = true;
        return;
      }
    },
    onkeypress: function(event) {
      if (event.keyCode === 61 || event.keyCode === 13) {
        this.onInputNumber("=");
        return;
      }
    }
  }
};
</script>