import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { width } from '@mui/system'
import { Interface } from 'readline'

const button = {
  height: '2.5rem'
}

interface props {
  woods: number
  handleClickSleep: () => void
  handleClickSearch: () => void
}

export default function SafeHouse({woods, handleClickSleep, handleClickSearch}: props) {

  return (
    <Grid item container>
        <Button variant="contained" sx={button} onClick={handleClickSleep}>休息</Button>
        <Button variant="contained" sx={button} onClick={handleClickSearch}>搜索周圍</Button>

        <Box sx={{...button, display: "flex", flexDirection: "column"} }>
        {!woods && <Button variant="outlined" sx={button} disabled>工具台</Button>}
        {!!woods && <>
          <Button variant="contained" sx={button} onClick={handleClickSleep}>工具台</Button>
          <Button sx={{width: 'auto'}} variant="contained" onClick={handleClickSearch}>製作肉乾用的架台</Button>
          <Button sx={{width: '100%'}} variant="contained" onClick={handleClickSearch}>集水器</Button>
          <Button sx={{width: '100%'}} variant="contained" onClick={handleClickSearch}>背包</Button>
          <Button sx={{width: '100%'}} variant="contained" onClick={handleClickSearch}>大背包</Button>
        </>}
        </Box>
    </Grid>
  )
}
