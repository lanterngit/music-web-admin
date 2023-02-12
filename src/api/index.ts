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
    // 返回指定ID的用户
    getUserOfId: (id: string | number) => get(`user/detail?id=${id}`),
    // 获得指定歌曲ID的评论列表
    getCommentOfSongId: (songId: string | number) => get(`comment/song/detail?songId=${songId}`),
    // 获得指定歌单ID的评论列表
    getCommentOfSongListId: (songListId: string | number) => get(`comment/songList/detail?songListId=${songListId}`),
    // 删除评论
    deleteComment: (id: string | number) => get(`comment/delete?id=${id}`),
    // 删除用户
    deleteUser: (id: string | number) => get(`user/delete?id=${id}`),
    // 更新歌手信息
    updateSingerMsg: ({id, name, sex, birth, location, introduction}) => post(`singer/update`, {
        id,
        name,
        sex,
        birth,
        location,
        introduction
    }),
    // 添加歌手
    setSinger: ({name, sex, birth, location, introduction}) => post(`singer/add`, {
        name,
        sex,
        birth,
        location,
        introduction
    }),
    // 删除歌手
    deleteSinger: (id) => deletes(`singer/delete?id=${id}`),
}
export default api