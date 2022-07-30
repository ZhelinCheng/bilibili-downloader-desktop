/*
 * @Author       : 程哲林
 * @Date         : 2022-07-30 23:17:42
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-31 00:23:00
 * @FilePath     : /bilibili-downloader-desktop/src/utils/request.ts
 * @Description  : 未添加文件描述
 */
import { fetch, FetchOptions } from '@tauri-apps/api/http'

interface RequestData<T> {
  code: number
  message: string
  ttl: number
  data: T
}

export async function rq<T = any>(
  url: string,
  options: Omit<FetchOptions, 'timeout'>
): Promise<RequestData<T> | null> {
  const { status, data } = await fetch<RequestData<T>>(url, {
    timeout: 5000,
    // headers: {},
    ...options,
  })

  if (status >= 200 && status < 300) {
    return data
  }

  return null
}
