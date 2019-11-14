import React , {useState, useEffect} from 'react'

const Countdown = (props) =>{

//     const [countdown, setCountdown] = useState(5)
//    // let countdown = 5;
//    const pushnumber = () =>{
//          window.interval = setInterval(() =>{
//             // setCountdown(countdown -1)
//             setCountdown(countdown - 1);
//             console.log(countdown);
    
//             if(countdown <= 0){
//                window.clearInterval(window.interval);
//             }
    
//          }, 1000);

//    } 

//    useEffect(() =>{
//     pushnumber()
//    }, [])


const [seconds, setSeconds] = useState(5);

useEffect(() => {
  const interval = setInterval(() => {

    console.log('test' + seconds)
    if(seconds < 1){
        clearInterval(interval);
    }else{
        setSeconds(seconds => seconds - 1);
    }
    

   

  }, 1000);
  return () => clearInterval(interval);
}, []);

return (
  <div className="App">
    <header className="App-header">
      {seconds >= 0 ? seconds : 0} seconds have elapsed since mounting.
    </header>
  </div>
);

    // return(
    //     <div> {countdown}</div>
    // )
}

export default Countdown