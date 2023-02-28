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
    water: number
    berry: number
}

export default function Bag({woods, water, berry}: props) {

  return (
    <Grid container>
        <Paper elevation={3} sx={{width: '100%', height: 'auto', paddingX: '1rem', paddingY: '0.5rem'}}>
            <Typography variant="subtitle1" component="h2">
                木頭：{woods}
            </Typography>
            <Typography variant="subtitle1" component="h2">
                水：{water}
            </Typography>
            <Typography variant="subtitle1" component="h2">
                樹果：{berry}
            </Typography>
        </Paper>
    </Grid>
  )
}
