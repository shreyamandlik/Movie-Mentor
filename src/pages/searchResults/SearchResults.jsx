import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


import "./style.scss"
import { fetchDatafromAPI } from "../../utils/api";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png"
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";


const SearchResult = () => {

    const [data, setData] = useState(null);
    const [pagenum, setPagenum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialPage = () => {
        setLoading(true)
        fetchDatafromAPI(`/search/multi?query=${query}/&page?=${pagenum}`).then((res) => {
            setData(res)
            setPagenum((prev) => prev + 1);
            setLoading(false);
        })
    }

    const fetchNextPage = () => {
        fetchDatafromAPI(`/search/multi?query=${query}/&page?=${pagenum}`).then((res) => {
            if (data?.results) {
                setData({
                    ...data, results: [...data?.results, res?.results]
                })
            } else {
                setData(res)
            }
            setPagenum((prev) => prev + 1);
        })
    }

    useEffect(() => {
        fetchInitialPage();
        setPagenum(1)
    }, [query])


    return (
        <>
            <div className="searchResultsPage">
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <ContentWrapper>
                        {data?.results.length > 0 ? (
                            <>
                                <div className="pageTitle">
                                    {`Search ${data.total_results > 1 ? "results" : "result"} of '${query}'`}
                                </div>
                                <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPage}
                                loader={<Spinner/>}
                                hasMore={pagenum<= data?.total_pages}
                                >
                                    {data.results.map((item, index)=>{
                                        if(item.media_type==="person") return;
                                        return (
                                            <MovieCard key={index} data={item} fromSearch={true}/>
                                        )
                                    })}
                                </InfiniteScroll>
                            </>
                        ) :
                            (
                                <span className="resultNotFound"> Sorry result not found</span>
                            )}
                    </ContentWrapper>
                )}
            </div></>
    )
}

export default SearchResult;