import './Today.scss'


export default function today(props: any) {

  return(
    
        <div>
       
            {props.status == "Loading" ? <h2>Loading...</h2>:
            <>
            
            <h2>{props.currentWeather.location.name}</h2>
            <h2 className="temp">{props.currentWeather.current.temp_c} &deg; C</h2>

            <h2 className='wind'>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wind" className="wind-icon svg-inline--fa fa-wind fa-2xl " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"></path>
                </svg>
                &nbsp; {Math.round(props.currentWeather.current.wind_kph * 5/18)} m/s {props.currentWeather.current.wind_dir}</h2>
            </>
            } 

        </div>
    )
}

