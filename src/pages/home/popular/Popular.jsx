import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousal from '../../../components/carousal/Carousal';


const  Popular= () => {

    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/popular/`)


    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    }


    return (
        <div className='carousalSection'>
            <ContentWrapper>
                <span className='carousalTitle'> What's New</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousal data={data?.results} loading={loading} endpoint={endpoint}  />
        </div>
    )
}

export default Popular;
