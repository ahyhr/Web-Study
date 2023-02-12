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
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background: rgb(248, 245, 245);
  height: 55px;
}
</style>