Vue.component('App', {
  template: `
  <div id="app"  @keypress.exact="onkeypress">
 
  <table>
  <tr>
    <td class="e">
    <div class="bounce">
      <i style="font-size:small">Time:</i>
      <transition name="bounce">
        <span v-if="totalTimeFlag" :class="{wrong:totalTime<10}" key="on">{{totalTime}}</span>
        <span v-else="" :class="{wrong:totalTime<10}" >{{totalTime}}</span>
      </transition>
      </div>
    </td>
    <td class="e">
    <div class="in-out-translate-demo-wrapper">
      <i style="font-size:small">Level:</i>
      <transition name="in-out-translate-fade" mode="in-out">
        <span v-if="levelFlag" key="on">{{level+1}}</span>
        <span v-else="" key="off">{{level+1}}</span>
      </transition>
      </div>
    </td>
    <td><span :class="icon"></span></td>
    <td class="e"><i style="font-size:small">Total Win:</i>{{totalWin}}</td>
  </tr>
  <tr>
    <td class="e" >
    <div class="in-out-translate-demo-wrapper">
      <i style="font-size:small">Life:</i>
      <transition name="in-out-translate-fade" mode="in-out">
        <span v-if="lifeFlag" key="on">{{life}}</span>
        <span v-else="" key="off">{{life}}</span>
        </transition>
    </td>
    <td class="e" colspan="2"><i style="font-size:small">Score:</i>{{score}}</td>
    <td class="e"><i style="font-size:small">Win:</i>{{win}}</td>
  </tr>
  </table>
    <div v-if="gameOver">
      <h1 style="color:red">Game Over!</h1>
      <button @click="newGame">Start</button>
    </div>
    <div  v-else="gameOver">
      <div v-for="expId in expressionsIdx">
      <expression :id='expId' ref='expId' @activate='activate'  />
      </div>
      <NumberEntry @inputNumber="onInputNumber"/>
    </div>
    </div>`,
  provide: function () {
    return {
      goodAnswer: this.goodAnswer,
      badAnswer: this.badAnswer
    }
  },

  data() {
    return {
      gameOver: true,
      gameStatusChanged: false,
      totalTime: TOTAL_TIME,
      totalTimeFlag: false,
      life: TOTAL_LIFE,
      lifeFlag: false,
      level: 0,
      levelFlag: false,
      score: 0,
      win: 0,
      totalWin: 0,
      shiftKey: false,
      activeIdx: 0,
      scoreLevel: [10, 100, 1000, 10000, 10000, 10000],
      iconSet: [],
      expressionsIdx: [0, 1, 2, 3, 4],
      timer: null,
    }
  },
  computed: {
    lifeIcon() {
      let ret = '';
      for (var i = 0; i < this.life; i++) {
        ret += '<i class="far fa-plus-square fa-2x"></i>';
      }
      return ret;
    },
    icon() {
      let size = parseInt(this.totalTime % 6);
      return this.iconSet[this.level] + ' ' + iconSize[size];
    }
  },
  mounted() {
    let r = parseInt(Math.random() * 100 % 2);
    this.iconSet = iconSets[r];
  },
  updated() {
    if (this.gameStatusChanged) {
      this.activate(this.activeIdx);
      this.gameStatusChanged = false;
    }
  },
  name: "App",
  methods: {
    newGame() {
      this.gameOver = false;
      this.gameStatusChanged = true;
      this.totalTime = TOTAL_TIME;
      this.life = TOTAL_LIFE;
      this.level = 0;
      this.score = 0;
      this.win = 0;
      this.totalWin = 0;
      this.shiftKey = false;
      this.activeIdx = 0;

      this.timer = setInterval(() => {
        this.totalTime -= 1;
        this.checkGame();
        if (this.totalTime < 10 && this.totalTime > 0)
          this.totalTimeFlag = !this.totalTimeFlag;
      }, 1000);
      // this.activate(this.activeIdx);
    },
    checkGame() {
      if (this.totalTime <= 0 || this.life <= 0) {
        this.gameOver = true;
        clearInterval(this.timer);
      }
    },
    activate(idx) {
      this.activeIdx = idx;
      console.log("activate: " + idx);
      for (let i in this.expressionsIdx) {
        if (i != this.activeIdx) {
          this.$refs.expId[i].$data.active = false;
        } else {
          this.$refs.expId[i].$data.active = true;
          // this.onInputNumber(''); //set focus
        }
      }
    },
    onInputNumber(key) {
      // console.log("App catch:" + key + " active:" + this.activeIdx);
      this.$refs.expId[this.activeIdx].setInputAnswer(key);
    },
    goodAnswer: function (vmExp) {
      console.log("goodAnswer::");
      this.win += 1;
      this.totalWin += 1;
      this.score += this.scoreLevel[this.level] / Math.pow(10, this.level) * this.win;
      if (this.score > this.scoreLevel[this.level]) {
        this.level += 1;
        this.levelFlag = !this.levelFlag;
        console.log("level up::" + this.level);
      }
      vmExp.setLevel(this.level);

    },
    badAnswer: function (vmExp) {
      console.log("badAnswer::");
      this.win = 0;
      this.life -= 1;
      this.lifeFlag = !this.lifeFlag;

      let idx = this.activeIdx + 1;
      if (idx >= this.expressionsIdx.length) { idx = 0 }
      this.activate(idx);
    },
    onkeyup: function (event) {
      console.log("keyup-keycode  ::" + event.keyCode);
      if (event.keyCode === 16) {
        this.shiftKey = false;
        return;
      }
      if (this.shiftKey && event.keyCode === 186) {
        this.shiftKey = false;
        this.onInputNumber('*');
        return;
      }
      if (this.shiftKey && event.keyCode === 187) {
        this.shiftKey = false;
        this.onInputNumber('+');
        return;
      }
      if (this.shiftKey && event.keyCode === 188) {
        this.shiftKey = false;
        this.onInputNumber('<');
        return;
      }
      if (this.shiftKey && event.keyCode === 189) {
        this.shiftKey = false;
        this.onInputNumber('=');
        return;
      }
      if (this.shiftKey && event.keyCode === 190) {
        this.shiftKey = false;
        this.onInputNumber('>');
        return;
      }
    },
    onkeydown: function (event) {
      if (event.keyCode === 16) {
        this.shiftKey = true;
        return;
      }
    },
    onkeypress: function (event) {
      if (event.keyCode === 61 || event.keyCode === 13) {
        this.onInputNumber('=');
        return;
      }
    }

  }
}
)