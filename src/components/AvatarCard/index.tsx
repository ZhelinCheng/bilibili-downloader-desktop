/*
 * @Author       : 程哲林
 * @Date         : 2022-07-30 16:38:36
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-30 17:10:06
 * @FilePath     : /bilibili-downloader-desktop/src/components/AvatarCard/index.tsx
 * @Description  : 未添加文件描述
 */
import React from 'react'
import { Avatar, Box, Typography, Button, Stack } from '@mui/material'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import LoyaltyIcon from '@mui/icons-material/Loyalty'

import styles from './index.module.scss'

const AvatarCard = React.memo((): JSX.Element => {
  return (
    <Box className={styles['m-avatar-card']}>
      <Avatar
        className={styles.avatar}
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
      />

      <Stack className={styles.info}>
        <Typography gutterBottom variant="h6">
          池野欣欣子
        </Typography>
        <Typography display="block" variant="caption" color="text.secondary">
          107 个投稿 | 4.78w 播放
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
