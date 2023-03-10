import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { width } from '@mui/system'
import SafeHouse from '../components/Areas/SafeHouse'
import UserPanel from '../components/UserPanel'
import Bag from '../components/Bag'
import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, WebGLRenderer, PerspectiveCamera, AnimationMixer, Clock, DirectionalLight, PointLight, sRGBEncoding, Color, Vector3, Plane } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const inter = Inter({ subsets: ['latin'] })

const scene = new Scene();

const loader = new GLTFLoader();
const clock = new Clock();
const light = new DirectionalLight('#FFED97', 0.5);
const light2 = new PointLight('#FF5809', 10, 100);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const button = {
  height: '2.5rem'
}

export default function Home() {

  const [area, setArea] = useState<string>()
  const [msgs, setMsgs] = useState<string[]>([])
  const [woods, setWoods] = useState<number>(0)
  const [water, setWater] = useState<number>(0)
  const [berry, setBerry] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  function handleClickArea (area: string) {
    setArea(area)
  }
  function handleClickSleep () {
    setMsgs(pMsgs => [...pMsgs, '你的體力恢復了'])
  }
  function handleClickSearch () {
    const random = Math.random() * 100
    switch (true) {
      case (random >= 0 && random <= 33):
        setWoods(pre => pre + 1)
        setMsgs(pMsgs => [...pMsgs, '得到一塊木頭'])
        break
      case (random >= 34 && random <= 66):
        setWater(pre => pre + 1)
        setMsgs(pMsgs => [...pMsgs, '得到一瓶水'])
        break
      case (random >= 67 && random <= 100):
        setBerry(pre => pre + 1)
        setMsgs(pMsgs => [...pMsgs, '得到一顆樹果'])
        break
      default:
        break
    }
  }

  useEffect(() => {
    const camera = new PerspectiveCamera( 75, 1, 0.1, 50 );
    const renderer = new WebGLRenderer();
    renderer.setSize( 1000, 1000 );
    renderer.outputEncoding = sRGBEncoding;
    
    camera.position.set(0, 0, 7);
    scene.position.set(0, 0, 0);
    scene.background = new Color('#141b25')
    
    const clipPlane = new Plane(new Vector3(0, 0.45, 0), 3.5); // 定義一個平面，過原點，法向量朝下，位置在 z = 10 的平面上方
    renderer.clippingPlanes = [clipPlane]; // 將平面設定為裁剪平面
    camera.updateMatrix()
    let mixers: AnimationMixer[] = []
    loader.load(
      // resource URL
      '3DModels/Campfire.gltf',
      // called when the resource is loaded
      function ( gltf ) {

        gltf.scene.position.set(-1.5, -1, 0)
        gltf.scene.rotation.set(0.25, 2.5, 0.1)

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group-
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object


        const mixer = new AnimationMixer(gltf.scene);

        // 將所有動畫加入到 mixers 陣列中
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
        mixers.push(mixer)

        light.position.set(2, 5, 5);
        light2.position.set(0.5, 1, 0);
        light2.rotation.set(0, 0, 0);
        scene.add(light);
        scene.add(light2);
      },
      // called while loading is progressing
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened' );
      }
    );

    function animate() {
      requestAnimationFrame( animate );
      
      if (mixers.length > 0) {
        
        mixers.forEach((mixer) => {
          mixer.update(clock.getDelta());
        });
      }
      renderer.render( scene, camera );
    }
    animate();
    
    ref.current?.appendChild(renderer.domElement);
    
    return () => {
      camera.remove()
    }
  }, [])

  return (
    <>
      <Head>
        <title>ZombieGo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='pagemain'>
        <Grid container spacing={1} sx={{height: '100vh'}}>
          <Grid item xs>
            {msgs && msgs.map((msg, i) => <Item key={i}>{msg}</Item>)}
          </Grid>

          <Grid item xs={6} container direction="column">
            <Box>
              <Button variant="text" onClick={() => handleClickArea('area')}>安全屋</Button>
              <Button variant="text" >未知區域</Button>
            </Box>
            <SafeHouse 
              woods={woods}
              handleClickSleep={handleClickSleep}
              handleClickSearch={handleClickSearch} />
          </Grid>

          <Grid item xs>
            <UserPanel />
            <Bag woods={woods}
            water={water} 
            berry={berry} />
          </Grid>
        </Grid>
        <Box sx={threeD} ref={ref}></Box>
        <Paper sx={{position: 'fixed', right: 0, left: 0, top: 0, bottom: 0, zIndex: -2, backgroundColor: '#141b25'}}></Paper>
      </main>
    </>
  )
}

const threeD = {
  position: 'fixed',
  width: '40rem',
  height: '60%',
  right: 0,
  bottom: '10rem',
  zIndex: -1
}