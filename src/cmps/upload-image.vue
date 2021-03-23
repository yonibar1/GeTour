<template>
  <section class="img-upload-container">
    <label v-if="!isLoading">
      <i class="fas fa-cloud-upload-alt">
        <input type="file" @change="onUploadImg" />
      </i>
      <div class="imgs-container">
        <img
          class="uploaded-img"
          v-for="(url, idx) in imgUrls"
          :key="idx"
          :src="url"
        />
      </div>
    </label>
    <img
      class="loading"
      v-else
      src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fflutter.website%2Fa-collection-of-high-fidelity-loading-animations-in-gif-format-with-flutter%2F&psig=AOvVaw3AES-sl4gO9xhexl4Doz5y&ust=1616532775611000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjUsoHkxO8CFQAAAAAdAAAAABBO"
      alt=""
    />
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  data() {
    return {
      isLoading: false,
      imgUrls: [],
    };
  },

  methods: {
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.$emit("save", res.url);
      this.imgUrls.push(res.url);
      console.log(this.imgUrls);
      this.isLoading = false;
    },
  },
};
</script>

<style>


.loading {
  height: 200px;
}

img.upload {
  height: 150px;
  cursor: pointer;
}
</style>