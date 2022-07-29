/*
 * @Author       : 程哲林
 * @Date         : 2022-07-29 20:52:17
 * @LastEditors  : 程哲林
 * @LastEditTime : 2022-07-29 21:29:19
 * @FilePath     : /bilibili-downloader-desktop/src/pages/index.tsx
 * @Description  : 未添加文件描述
 */
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from './index.module.scss'

const IndexPage = React.memo((): JSX.Element => {
  return (
    <div className={styles.main}>
      <Stack spacing={2} direction='row'>
        <Button variant='text'>Text</Button>
        <Button variant='contained'>Contained</Button>
        <Button variant='outlined'>Outlined</Button>
      </Stack>
    </div>
  );
});

export default IndexPage;
