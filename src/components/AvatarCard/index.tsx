/*
 * @Author       : 程哲林
 * @Date         : 2022-07-30 16:38:36
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-31 00:26:34
 * @FilePath     : /bilibili-downloader-desktop/src/components/AvatarCard/index.tsx
 * @Description  : 未添加文件描述
 */
import React from 'react'
import { Avatar, Box, Typography, Button, Stack } from '@mui/material'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import LoyaltyIcon from '@mui/icons-material/Loyalty'

import styles from './index.module.scss'
import { UpInfoBase } from '../../api/download'


const AvatarCard = React.memo(({
  face,
  name,
  play,
  works
}: UpInfoBase & { works: number }): JSX.Element => {
  return (
    <Box className={styles['m-avatar-card']}>
      <Avatar
        className={styles.avatar}
        alt={name}
        src={face}
      />

      <Stack className={styles.info}>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography display="block" variant="caption" color="text.secondary">
          {works} 个投稿 | {play} 播放
        </Typography>
      </Stack>
      <Stack direction="row" className={styles.action} spacing={2}>
        <Button size="small" variant="outlined" endIcon={<LoyaltyIcon />}>
          订阅
        </Button>
        <Button
          size="small"
          variant="outlined"
          endIcon={<BrowserUpdatedIcon />}
        >
          下载全部
        </Button>
      </Stack>
    </Box>
  )
})

export default AvatarCard
