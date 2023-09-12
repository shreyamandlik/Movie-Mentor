import React, { useEffect, useState } from "react";

import "./style.scss";
import "./style.scss";

import { useNavigate } from "react-router-dom";

import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Img from "../../../components/lazzyLoadimages/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setbackground] = useState("");
    const [query, setquery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch("/movie/upcoming");
    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setbackground(bg);
    }, [data])

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <>
            <div className="heroBanner">
                {!loading &&
                    <div className="backdrop-img">
                        <Img
                            src={background}
                        />
                    </div>
                }

                <div className="opacity-layer"></div>

                <ContentWrapper>
                    <div className="wrapper">
                        <div className="heroBannerContent">
                            <span className="title">Welcome</span>
                            <span className="subTitle">Millions of People, Movies and TV shows to discover Explore now.</span>
                            <div className="searchInput">
                                <input
                                    type="text"
                                    placeholder="search for tv shows or movies..."
                                    onKeyUp={searchQueryHandler}
                                    onChange={(e) => setquery(e.target.value)}
                                />
                                <button>Search</button>
                            </div>
                        </div>
                    </div>

                </ContentWrapper>

            </div>
        </>
    )
}

export default HeroBanner;