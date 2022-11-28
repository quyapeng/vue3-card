<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { updateApp } from "./utils/tools";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
  // update();
  updateApp();
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
