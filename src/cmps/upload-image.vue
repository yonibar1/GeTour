<template>
  <section class="img-upload-container">
    <label v-if="!isLoading">
      <i class="fas fa-cloud-upload-alt">
        <input class="file-input" type="file" @change="onUploadImg" />
      </i>
    </label>
    <div  v-else class="loader"></div>
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  name: "UploadImg",
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.$emit("save", res.url);
      this.isLoading = false;
    },
  },
};
</script>
