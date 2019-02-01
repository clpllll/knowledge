<template>
  <svg class="icon" @click="handleClick">
    <use :xlink:href="'#icon-'+iconName"></use>
  </svg>
</template>
<script>
export default {
  props:{
    iconName:{
      type:String,
      default:''
    }
  },
  methods:{
    handleClick(){
      this.$emit('click')
    }
  }
}
</script> 
<style scoped lang="less">
  .icon{
    width:1em;
    height: 1em;
    vertical-align: -0.15em;
    overflow: hidden;
  }
  svg path{
    fill: inherit;
    stroke: inherit;
    stroke-width: inherit;
  }
</style>

