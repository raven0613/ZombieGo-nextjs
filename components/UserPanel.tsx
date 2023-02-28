import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { width } from '@mui/system'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

const button = {
  height: '2.5rem'
}

interface props {

}

const SPIRIT = 100
const FULL = 100

export default function UserPanel({}: props) {
    const [full, setFull] = useState<number>(FULL);
    const [spirit, setSpirit] = useState<number>(SPIRIT);
    const fProgress = full / FULL * 100
    const sProgress = spirit / SPIRIT * 100

    useEffect(() => {
        const timer = setInterval(() => {
            setFull(prev => prev <= 0? 0 : prev - 1);
        }, 1500);
        return () => {
            clearInterval(timer);
        };
    }, []);
    useEffect(() => {
        const timer = setInterval(() => {
            setSpirit(prev => prev <= 0? 0 : prev - 1);
        }, 60000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Grid container>
            <Paper elevation={3} sx={{width: '100%', height: 'auto', paddingX: '1rem', paddingY: '0.5rem'}}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle1" component="h2">
                        飽足感
                    </Typography>
                    <LinearProgressWithLabel value={fProgress} />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle1" component="h2">
                        精神值
                    </Typography>
                    <LinearProgressWithLabel value={sProgress} />
                </Box>
            </Paper>
        </Grid>
    )
}


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color={props.value < 20? 'error' : 'success'} variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}