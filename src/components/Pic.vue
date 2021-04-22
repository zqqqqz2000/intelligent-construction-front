<template>
  <div>
    <img :src="imgSrc" :alt="alt" :style="imgStyle">
  </div>
</template>

<script>
import {api} from "@/utils";
import {picServerUrl} from "@/config";

export default {
  name: "Pic",
  props: ['picid', 'alt', 'img-style'],
  mounted() {
    this.loadPicSrc();
  },
  data() {
    return {
      'imgSrc': '',
    }
  }
  ,
  methods: {
    loadPicSrc() {
      api.bind(this)(
          '/pic/get_img',
          {
            id: this.picid,
          },
          (response) => {
            let data = response.data;
            this.imgSrc = picServerUrl + '/' + data.pic_path;
          }
      )
    }
  }
}
</script>

<style scoped>

</style>