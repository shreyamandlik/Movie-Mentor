import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazzyLoadimages/img";
import PosterFallback from "../../assets/no-poster.png";


import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


const Carousal = ({ data, loading, endpoint, title }) => {

    const carousalContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const navigation = (dir) => {
        const container = carousalContainer.current;

        const scrollAmount = dir === "left" 
        ? container.scrollLeft - (container.offsetWidth + 20) 
        : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left:scrollAmount,
            behaviour:"smooth"
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>

        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {!loading ? (
                    <div className="carouselItems" ref={carousalContainer}>
                        {data?.map((items) => {
                            const posterurl = items.poster_path ? url.poster + items.poster_path : PosterFallback;
                            return (
                                <div className="carouselItem" key={items.id} onClick={()=>navigate(`/${items.media_type || endpoint}/${items.id}`)}>
                                    <div className="posterBlock">
                                        <Img src={posterurl} />
                                        <CircleRating
                                            rating={items.vote_average.toFixed(1)}
                                        />
                                        <Genres data={items.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {items.title || items.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(items.release_date || items.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}

                    </div>
                )}
            </ContentWrapper>

        </div>
    )
}

export default Carousal
