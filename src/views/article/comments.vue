<template>
  <ul class="container">
    <li v-for="comment in comments" :key="comment.id">
      <div class="comment-item-wrapper">
        <section class="comment-content">
          <header class="content-header">
            <div class="nickname">@{{comment.nickname}}:</div>
            <el-button type="danger" size="mini" @click="deleleComment(comment.id)">删除</el-button>
          </header>
          <div class="content">{{comment.content}}</div>
          <section class="reply-target" v-if="comment.parent_id !== 0">
            <div class="reply-nickname" v-if="comment.replyName">@{{comment.replyName}}:</div>
            <div>{{comment.replyContent}}</div>
          </section>
        </section>
        <footer class="comment-footer">
          <span>{{comment.createdDate}}</span>
          <span>赞: {{comment.like}}&nbsp;主页：{{comment.website ? comment.website : '空'}}</span>
        </footer>
      </div>
    </li>
    <div v-if="!comments.length">暂无评论</div>
  </ul>
</template>

<script>
import article from '@/services/models/article'
import Utils from '@/services/utils/util'

export default {
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },

  data() {
    return {
      loading: false,
      comments: []
    }
  },
  
  methods: {
    async deleleComment(id) {
      this.$confirm('此操作将永久删除评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          const res = await article.deleteComment(id)
          if (res.errorCode === 0) {
            this.loading = false
            await this.getComments()
            this.$message.success(`${res.msg}`)
          } else {
            this.loading = false
            this.$message.error(`${res.msg}`)
          }
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },

    async getComments() {
      try {
        this.loading = true
        let res = await article.getComments(this.id)
        res.forEach(v => {
          v.createdDate = Utils.timestampToTime(v.created_date)
          if (v.parent_id !== 0) {
            const reply = res.find(target => target.id === v.parent_id)
            if (reply) {
              v.replyName = reply.nickname
              v.replyContent = reply.content
            } else {
              v.replyName = ''
              v.replyContent = '该评论已被删除'
            }
          }
        })
        this.comments = res
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    }
  },

  created() {
    this.getComments()
  }
  
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.container {
  box-sizing: border-box;
  height: 50vh;
  padding: 0 20px;
  overflow-y: auto;
}

.comment-item-wrapper {
  margin-bottom: 20px;
  border-bottom: 1px dashed $border-color-light;

  .comment-content {
    color: $theme-primary;

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nickname {
      font-weight: $font-weight-bold;
    }

    .content {
      margin: 15px 0;
    }

    .reply-target {
      padding: 10px;
      border: 1px solid $border-color-light;
      background-color: $background-color-main;
      border-radius: 4px;

      .reply-nickname {
        margin-bottom: 5px;
      }
    }
  }

  .comment-footer {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: $font-size-minimum;
    color: $primary-light-0;
  }
}
</style>

