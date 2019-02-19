<template>
  <div id="number-entry" >
  <Row type="flex" justify="center" align="middle">
  <Col span="4">
      <Button type="error" style="width:75px; height:40px" size="large" @click.prevent="onclick('BS')"><span style="font-size:x-large">&lt;-BS</span></Button>
  </Col>
  <Col span="4">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('/')"><span style="font-size:x-large">/</span></Button>
  </Col>
  <Col span="4">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('*')"><span style="font-size:x-large">*</span></Button>
  </Col>
  <Col span="4">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('-')"><span style="font-size:x-large">-</span></Button>
  </Col>
  </Row>
  
  <Row type="flex" justify="center" align="middle">
  <Col span="4" style="width:75px">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('7')"><span style="font-size:x-large">7</span></Button>
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('4')"><span style="font-size:x-large">4</span></Button>
  </Col>
  <Col span="4" style="width:75px">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('8')"><span style="font-size:x-large">8</span></Button>
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('5')"><span style="font-size:x-large">5</span></Button>
  </Col>
  <Col span="4" style="width:75px">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('9')"><span style="font-size:x-large">9</span></Button>
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('6')"><span style="font-size:x-large">6</span></Button>
  </Col>
  <Col span="4" style="width:75px">
      <Button type="default" style="width:75px; height:80px" size="large" @click.prevent="onclick('+')"><span style="font-size:x-large">+</span></Button>
  </Col>
  </Row>
  
  <Row type="flex" justify="center" align="middle">

  
  <Col span="8" style="width:150px">
      <Row type="flex" justify="center" align="middle">
      <Col span="4" style="width:75px">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('1')"><span style="font-size:x-large">1</span></Button>
      </Col>
      <Col span="4" style="width:75px">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('2')"><span style="font-size:x-large">2</span></Button>
      </Col>
      </Row>
      <Row type="flex" justify="center" align="middle">
      <Col span="8" style="width:150px">
      <Button type="default" style="width:150px; height:40px" size="large" @click.prevent="onclick('0')" ><span style="font-size:x-large">0</span></Button>
      </Col>
      </Row>
  </Col>
  <Col span="4" style="width:75px">
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('3')"><span style="font-size:x-large">3</span></Button>
      <Button type="default" style="width:75px; height:40px" size="large" @click.prevent="onclick('.')"><span style="font-size:x-large">.</span></Button>
  </Col>
  <Col span="4" style="width:75px">
      <Button type="success" style="width:75px; height:80px" size="large" @click.prevent="onclick('=')"><span style="font-size:x-large">=</span></Button>
  </Col>
  </Row>

  <Row type="flex" justify="center" align="middle">
  <Col span="8" style="width:150px">
      <Button type="info" shape="circle" style="width:150px; height:40px" size="large" @click.prevent="onclick('<')" ><span style="font-size:x-large">&lt;</span></Button>
  </Col>
  <Col span="8" style="width:150px">
      <Button type="info" shape="circle" style="width:150px; height:40px" size="large" @click.prevent="onclick('>')" ><span style="font-size:x-large">&gt;</span></Button>
  </Col>
  </Row>
  </div>
  </template>

  <script>
export default {
  name: "NumberEntry",
  methods: {
    onclick(key) {
      console.log(key);
      this.$emit("inputNumber", key);
    }
  }
};
</script>