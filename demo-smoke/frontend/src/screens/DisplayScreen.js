import {React, useState, useEffect} from 'react'
import Display from '../components/Display'

function DisplayScreen() {

    const [lastPartOfUrl, setLastPartOfUrl] = useState('');

    useEffect(() => {
        // Ottieni l'ultima parte dell'URL (dopo l'ultimo /)
        const urlParts = window.location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];

        // Aggiorna lo state con l'ultima parte dell'URL
        setLastPartOfUrl(lastPart);
    }, []);


  return (
    <div>
    <Display keyword={lastPartOfUrl}/>
    </div>
  )
}

export default DisplayScreen