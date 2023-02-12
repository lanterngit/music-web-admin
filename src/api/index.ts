import {get, post} from "@/api/request";

const api = {
    //获取图片信息
    attachImageUrl: (url: string) => `http://106.55.181.80:8888/${url}`,
    //是否登录成功
    getLoginStatus: (data: object) => post('admin/login/status', data),
    // 返回所有用户
    getAllUser: () => get(`user`),
    // 返回所有歌手
    getAllSinger: () => get(`singer`),
    // 返回所有歌曲
    getAllSong: () => get(`song`),
    // 获取全部歌单
    getSongList: () => get(`songList`),
}
export default api