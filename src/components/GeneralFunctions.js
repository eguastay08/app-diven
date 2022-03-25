import * as Loc from 'expo-location';
import {useEffect, useState} from "react";

export const Location=()=>{
    const [location, setLocation] = useState();
    const [error, setError] = useState(false);

    useEffect( ()=>{
        (async () => {
            let { status } = await Loc.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError(true);
                return;
            }

            try{
                let location = await Loc.getCurrentPositionAsync({});
                setLocation(location);
            }catch (e){
                setError(true)
            }
        })();
        },[])


    if(location&&!error) {
        return {
           error: false,
            data:{
               "latitude":location.coords.latitude,
                "longitude":location.coords.longitude,
                "altitude":location.coords.altitude
            }
        }
    }
    return{
        error:true,
        msg:'Error al obtener su ubicación'
    }
}

