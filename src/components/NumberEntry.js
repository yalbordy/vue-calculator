Vue.component('NumberEntry', {
  template: `
  <div id="number-entry" >
  <Row type="flex" justify="center" align="middle">
  <Col span="4">
      <Poptip trigger="focus" content="Backspace"><Button type="error" style="width:75px; height:40px" size="large" @click.prevent="onclick('BS')">&lt;-BS</Button></Poptip>
      </Poptip>
  </Col>
  <Col span="4">
      <Poptip trigger="focus" content="/"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('/')">/</Button></Poptip>
  </Col>
  <Col span="4">
      <Poptip trigger="focus" content="*"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('*')">*</Button></Poptip>
  </Col>
  <Col span="4">
      <Poptip trigger="focus" content="-"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('-')">-</Button></Poptip>
  </Col>
  </Row>
  
  <Row type="flex" justify="center" align="middle">
  <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="7"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('7')">7</Button></Poptip>
      <Poptip trigger="focus" content="4"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('4')">4</Button></Poptip>
  </Col>
  <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="8"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('8')">8</Button></Poptip>
      <Poptip trigger="focus" content="5"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('5')">5</Button></Poptip>
  </Col>
  <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="9"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('9')">9</Button></Poptip>
      <Poptip trigger="focus" content="6"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('6')">6</Button></Poptip>
  </Col>
  <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="+"><Button type="default" style="width:75px; height:80px" size="large" @click.prevent="onclick('+')">+</Button></Poptip>
  </Col>
  </Row>
  
  <Row type="flex" justify="center" align="middle">

  
  <Col span="8" style="width:150px">
      <Row type="flex" justify="center" align="middle">
      <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="1"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('1')">1</Button></Poptip>
      </Col>
      <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="2"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('2')">2</Button></Poptip>
      </Col>
      </Row>
      <Row type="flex" justify="center" align="middle">
      <Col span="8" style="width:150px">
      <Poptip trigger="focus" content="0"><Button type="default" style="width:150px; height:40px" size="large" @click.prevent="onclick('0')" >0</Button></Poptip>
      </Col>
      </Row>
  </Col>
  <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="3"><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('3')">3</Button></Poptip>
      <Poptip trigger="focus" content="."><Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('.')">.</Button></Poptip>
  </Col>
  <Col span="4" style="width:75px">
      <Poptip trigger="focus" content="="><Button type="success" style="width:75px; height:80px" size="large" @click.prevent="onclick('=')">=</Button></Poptip>
  </Col>
  </Row>

  <Row type="flex" justify="center" align="middle">
  <Col span="8" style="width:150px">
      <Poptip trigger="focus" content="<"><Button type="info" shape="circle" style="width:150px; height:40px" size="large" @click.prevent="onclick('<')" >&lt;</Button></Poptip>
  </Col>
  <Col span="8" style="width:150px">
      <Poptip trigger="focus" content=">"><Button type="info" shape="circle" style="width:150px; height:40px" size="large" @click.prevent="onclick('>')" >&gt;</Button></Poptip>
  </Col>
  </Row>
  </div>`,
  name: 'NumberEntry',
  methods: {
    onclick(key) {
      console.log(key);
      this.$emit("inputNumber", key);
    }
  }
})