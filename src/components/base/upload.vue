<template>
  <div class="upload-container">
    <div class="upload-btn-wrapper">
      <el-button type="primary">
        选择图片
        <input class="file-input" ref="fileInput" accept="image/*" type="file" @change="fileChange"/>
      </el-button>
    </div>
    <div :style="croppaStyle" class="croppa-wrapper" v-show="showCroppa">
      <croppa
        ref="croppa"
        :width="cropRule.width"
        :height="cropRule.height"
        :placeholder="'loading'"
        :zoom-speed="30"
        :disable-drag-and-drop="false"
        :show-remove-button="false"
        :prevent-white-space="true"
        :disable-click-to-choose="false"
        :disable-scroll-to-zoom="false"
        :show-loading="true"
        :quality="quality"
        :initial-image="cropImg">
      </croppa>
    </div>
  </div>
</template>

<script>
import Croppa from 'vue-croppa'
import Vue from 'vue'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Croppa)

export default {
  props: {
    width: {
      type: Number,
      default: 150
    },

    height: {
      type: Number,
      default: 150
    }
  },

  data() {
    return {
      showCroppa: false,
      cropImg: '',
      croppa: {},
      imgInfo: null,
      quality: 1
    }
  },

  computed: {
    cropRule() {
      return {
        width: this.width,
        height: this.height
      }
    },

    imgRule() {
      return {
        minWidth: this.width,
        minHeight: this.height
      }
    },

    croppaStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },

  methods: {
    fileChange(evt) {
      if (evt.target.files.length !== 1) {
        this.clearFileInput(this.$refs.fileInput)
        return
      }
      const imgFile = evt.target.files[0]
      // 验证文件大小是否符合要求, 不大于 2M
      if (imgFile.size > 1024 * 1024 * 2) {
        this.$message.error('文件过大超过2M')
        // 清空输入框
        this.clearFileInput(this.$refs.fileInput)
        return
      }
  
      // 验证图片是否符合要求
      const imgSrc = window.URL.createObjectURL(imgFile)
      const image = new Image()
      image.src = imgSrc
      image.onload = () => {
        const w = image.width
        const h = image.height
        if (w < 50) {
          this.$message.error('图片宽度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.fileInput)
          return
        }
        if (h < 50) {
          this.$message.error('图片高度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.fileInput)
          return
        }
  
        // 验证通过
        this.cropImg = imgSrc
        this.showCroppa = true
        if (this.$refs.croppa) {
          this.$refs.croppa.refresh()
        }
        this.clearFileInput(this.$refs.fileInput)
      }
  
      image.onerror = () => {
        this.$message.error('获取本地图片出现错误, 请重试')
        // 清空输入框
        this.clearFileInput(this.$refs.fileInput)
      }
    },

    // 上传图片
    async handleCrop(name) {
      if (!name) {
        // eslint-disable-next-line no-console
        console.warn('图片名不能为空')
        return ''
      }
      if (!this.cropImg) {
        this.$message.error('请选择图片')
        return ''
      }
      // 获取剪裁数据
      const blob = await this.$refs.croppa.promisedBlob('image/jpeg', 0.8)
      // 构造为文件对象
      const file = new File([blob], `${name}.jpg`, {
        type: 'image/jpeg',
      })

      try {
        const res = await this.$axios({
          method: 'post',
          url: '/v1/file',
          data: {
            file
          }
        })
        this.clearFileInput(this.$refs.fileInput)
        if (!Array.isArray(res) || res.length !== 1) {
          this.$message.error('头像上传失败, 请重试')
          return ''
        }
        return res[0]
      } catch (error) {
        this.$message.error('头像上传失败, 请重试')
        return ''
      }
    },
  
    clearFileInput(ele) {
      ele.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  flex-direction: column;
}

.upload-btn-wrapper {
  position: relative;
  width: 90px;
  height: 32px;
  cursor: pointer;

  .file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 90px;
    height: 32px;
    outline: none;
    cursor: pointer;
    opacity: 0;
  }
}

.croppa-wrapper {
  margin-top: 10px;
  overflow: hidden;
  border: 2px dashed;
}
</style>
