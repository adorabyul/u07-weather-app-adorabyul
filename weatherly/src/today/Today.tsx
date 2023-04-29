import './Today.scss'


export default function today(props: any) {

  return(
    
        <div>
       
            {props.status == "Loading" ? <h2>Loading...</h2>:
            <>
            <h2>{props.currentWeather.location.name}</h2>
            <div className="todayInfo">

                <span className='wind'>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wind" className="svg-inline--fa fa-wind fa-2xl " role="img" xmlns="http://www.w3.org/2000/svg" height="64px" 
                        width="64px" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"></path>
                    </svg>
                    <h2>{Math.round(props.currentWeather.current.wind_kph * 5/18)} m/s {props.currentWeather.current.wind_dir}</h2>
                </span>
                {props.isCelsius ? 
                <h2 className="temp">{props.currentWeather.current.temp_c}&deg;C</h2>
                :
                <h2 className="temp">{props.currentWeather.current.temp_f}&deg;F</h2>
                }
                <h2 className="humidity">
                
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="100" height="100"
                    viewBox="0 0 32 32">
                    <path fill="currentColor" d="M 11.982422 2.0214844 A 1.036 1.036 0 0 0 11.199219 2.4003906 C 10.257219 3.6603906 2 14.845 2 20 A 10 10 0 0 0 17.556641 28.314453 A 1.0001266 1.0001266 0 0 0 16.443359 26.652344 A 8 8 0 0 1 4 20 C 4 16.563 9.192 8.6092187 12 4.6992188 C 13.939 7.4152187 18.7995 14.517609 19.8125 18.724609 A 2.4 2.4 0 0 1 18.621094 18.101562 A 4.178 4.178 0 0 0 12.974609 18.101562 A 2.178 2.178 0 0 1 11.400391 18.761719 A 1 1 0 0 0 11.400391 20.761719 A 4.079 4.079 0 0 0 14.224609 19.660156 A 2.206 2.206 0 0 1 17.371094 19.660156 A 4.182 4.182 0 0 0 23.021484 19.660156 A 2.213 2.213 0 0 1 26.177734 19.660156 A 4.089 4.089 0 0 0 29 20.759766 A 1 1 0 0 0 29 18.759766 A 2.183 2.183 0 0 1 27.421875 18.099609 A 4.183 4.183 0 0 0 21.771484 18.099609 L 21.730469 18.130859 C 20.264469 12.423859 13.117781 2.8233906 12.800781 2.4003906 A 1.036 1.036 0 0 0 11.982422 2.0214844 z M 25.470703 3.0214844 A 1.037 1.037 0 0 0 24.705078 3.3925781 C 24.086078 4.2005781 21 8.337 21 10.5 A 4.5 4.5 0 0 0 25.5 15 A 4.5 4.5 0 0 0 30 10.5 C 30 8.337 26.913922 4.2005781 26.294922 3.3925781 A 1.037 1.037 0 0 0 25.470703 3.0214844 z M 25.5 5.6992188 C 26.716 7.4332188 28 9.6 28 10.5 A 2.5 2.5 0 0 1 23 10.5 C 23 9.6 24.284 7.4332188 25.5 5.6992188 z M 15.970703 21.123047 A 4.178 4.178 0 0 0 12.970703 22.21875 A 2.178 2.178 0 0 1 11.398438 22.878906 A 1 1 0 0 0 11.398438 24.878906 A 4.079 4.079 0 0 0 14.220703 23.779297 A 2.206 2.206 0 0 1 17.369141 23.779297 A 4.182 4.182 0 0 0 23.019531 23.779297 A 2.213 2.213 0 0 1 26.173828 23.779297 A 4.089 4.089 0 0 0 29 24.880859 A 1 1 0 0 0 29 22.880859 A 2.183 2.183 0 0 1 27.421875 22.21875 A 4.183 4.183 0 0 0 21.771484 22.21875 A 2.209 2.209 0 0 1 18.619141 22.21875 A 4.178 4.178 0 0 0 15.970703 21.123047 z"></path>
                </svg>
                    &nbsp;{props.currentWeather.current.humidity}%</h2>
                
                
            </div>
            
            </>
            } 

        </div>
    )
}

