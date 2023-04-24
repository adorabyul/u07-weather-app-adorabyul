import './Today.scss'


export default function today(props: any) {

  return(
    
        <div>
       
            {props.status == "Loading" ? <h2>Loading...</h2>:
            <>
            <h2>{props.currentWeather.location.name}</h2>
            <h2 className="temp">{props.currentWeather.current.temp_c} &deg; C</h2>
            </>} 

        </div>
    )
}

