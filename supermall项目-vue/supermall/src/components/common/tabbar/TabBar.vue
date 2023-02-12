.<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
.tab-bar {
  display: flex;
  position: fixed;
  height: 49px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f6f6f6;
  box-shadow: 0  0 1px 1px rgba(100, 100, 100, 0.2);
}
</style>