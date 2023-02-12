import {post} from "@/api/request";

const api = {
    //获取图片信息
    attachImageUrl: (url: string) => `http://106.55.181.80:8888/${url}`,
    //是否登录成功
    getLoginStatus: (data: object) => post('admin/login/status', data)
}
export default api