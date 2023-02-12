.<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
#tab-bar{
  display: flex;
  background: cornsilk;
  width: 100%;
  height: 49px;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
}
</style>