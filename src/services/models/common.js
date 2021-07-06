import _axios from '@/services/plugins/axios'

class Common {
    // 创建文章
    async upLoad(formdata) {
        const res = await _axios({
            url: "v1/file",
            method: 'post',
            data: formdata,
            // headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res
    }
}

export default new Common()