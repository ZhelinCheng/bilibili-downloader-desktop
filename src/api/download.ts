import { rq } from '../utils/request'

interface VideoItems {
  list: List
  page: Page
  episodic_button: Episodicbutton
}

interface Episodicbutton {
  text: string
  uri: string
}

interface Page {
  pn: number
  ps: number
  count: number
}

interface List {
  tlist: {
    [key: string]: {
      tid: number
      count: number
      name: string
    }
  }
  vlist: Vlist[]
}

interface Vlist {
  comment: number
  typeid: number
  play: number
  pic: string
  subtitle: string
  description: string
  copyright: string
  title: string
  review: number
  author: string
  mid: number
  created: number
  length: string
  video_review: number
  aid: number
  bvid: string
  hide_click: boolean
  is_pay: number
  is_union_video: number
  is_steins_gate: number
  is_live_playback: number
}

export interface VideoItemsRes {
  status: 0 | 1
  count: number
  page: number
  limit: number
  items: Vlist[]
}

/**
 * 获取用户视频列表
 * @param mid UP主id
 * @param page 页数
 * @returns 视频列表
 */
export async function getVideoItems(
  mid: string,
  page = 1
): Promise<VideoItemsRes> {
  const url = `https://api.bilibili.com/x/space/arc/search`
  const res = await rq<VideoItems>(url, {
    method: 'GET',
    query: {
      mid,
      ps: '16',
      tid: '0',
      pn: page.toString(),
      keyword: '',
      order: 'pubdate',
    },
  })

  if (res?.code === 0 && res?.data) {
    const {
      list,
      page: { count, pn, ps },
    } = res.data
    return {
      status: 1,
      count,
      page: pn,
      limit: ps,
      items: list.vlist,
    }
  }
  return {
    status: 1,
    count: 0,
    page,
    limit: 16,
    items: [],
  }
}

/**
 * 获取Up主播放信息
 * @param mid UP主id
 * @returns 所有播放信息
 */
export async function getUpAllPlay(mid: string): Promise<{
  play: number
  likes: number
}> {
  const url = `https://api.bilibili.com/x/space/upstat`
  const res = await rq<{
    archive: {
      view: number
    }
    article: {
      view: number
    }
    likes: number
  }>(url, {
    method: 'GET',
    query: {
      mid,
    },
  })

  if (res?.code === 0 && res?.data) {
    return {
      play: res.data.archive?.view || 0,
      likes: res.data.likes || 0,
    }
  }
  return {
    play: 0,
    likes: 0,
  }
}

export interface UpInfoBase {
  name: string
  sign: string
  face: string
  play: number
  likes: number
  mid: string
}
export async function getUpInfo(mid: string): Promise<UpInfoBase> {
  const [res, play] = await Promise.all([
    rq<{
      name: string
      sign: string
      face: string
    }>(`https://api.bilibili.com/x/space/acc/info`, {
      method: 'GET',
      query: {
        mid,
      },
    }),
    getUpAllPlay(mid),
  ])
  if (res?.code === 0 && res?.data) {
    const { name, sign, face } = res.data
    return {
      ...play,
      mid,
      name,
      sign,
      face,
    }
  }
  return {
    mid,
    play: 0,
    likes: 0,
    name: '',
    sign: '',
    face: '',
  }
}
