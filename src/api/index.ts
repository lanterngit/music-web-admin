import {post} from "@/api/request";

const api = {
    //是否登录成功
    getLoginStatus:(data:object) => post('admin/login/status',data)
}
export default api