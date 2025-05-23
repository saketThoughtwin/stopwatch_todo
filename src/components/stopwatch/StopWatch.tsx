import React,{useEffect,useRef,useState} from "react";
import { Box, Button,Container,Typography,Paper} from "@mui/material";
import { useNavigate } from "react-router-dom";
const StopWatch : React.FC = ()=>{
    const [time,setTime] = useState(0);
    const [isRunning,setIsRunning]= useState(false);
    const intervalRef = useRef<number | null>(null);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isRunning){
            intervalRef.current = setInterval(() => {

                setTime((prevTime)=>prevTime +10);
            }, 10);
        }
        return() =>{
            if(intervalRef.current)
            {
                clearInterval(intervalRef.current)
            }
        }
    },[isRunning])
  const handleStart = ()=>setIsRunning(true);
  const handleStop = ()=>{
    if(intervalRef.current){
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }
  }
  const handleResume =()=>{
    setIsRunning(true);
  }
  const handleReset = ()=>{
    if(intervalRef.current){
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(0);
        }
    }
const formatTime =(ms:number)=>{
    const totalSeconds = Math.floor(ms/1000);
    const hours = Math.floor(totalSeconds/3600);
    const minutes = Math.floor((totalSeconds%3600)/60);
    const seconds = totalSeconds%60;
    const miliseconds = Math.floor((ms%1000)/10);
    const pad = (num :number, size:number =2)=>
        String(num).padStart(size,"0")
       
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(miliseconds)}`;
    
    
}
    return(
        <Container maxWidth="sm" sx={{mt:5}}>
            <Paper elevation={3} sx={{p:4, borderRadius:2, textAlign:"center"}}>
                <Typography variant="h4" gutterBottom>Stopwatch</Typography>
                <Typography variant="h2" sx={{mb:3}}>
                    {formatTime(time)}
                </Typography>
                <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    gap:2,
                    flexWrap:"wrap",
                    mb:3,
                }}>
                    {!isRunning && time === 0 &&(
                        <Button variant="contained" color="primary" onClick={handleStart} >Start</Button>

                    )}
                    {
                        isRunning && (
                            <Button variant="contained" color="error" onClick={handleStop}>
                                Stop
                            </Button>
                        )
                    }
                              {!isRunning && time > 0 && (
                                <Button variant="contained" color="success" onClick={handleResume}>
                                Resume
                                </Button>
                        )}
                                  {time > 0 && (
                            <Button variant="outlined" color="secondary" onClick={handleReset}>
                            Reset
                            </Button>
                        )}


                </Box>

                        <Button variant="outlined" fullWidth onClick={() => navigate("/")}>
                        Back to Todo List
                        </Button>   
            </Paper>
        </Container>
    )
}

export default StopWatch;