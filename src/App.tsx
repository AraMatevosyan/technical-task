import React, {useEffect, useState} from "react";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import getCommentsRequest from "./api/comments/getCommentsRequest";
import Comments from "./components/Comments";
import LikeIcon from "./components/LikeIcon";
import {addNestings, fetchData, getCommentsCount} from "./utils";
import {IAuthor, IComment} from "./interface";
import background from "./assets/background.png";
import "./App.css";

function App() {
    const [authors, setAuthors] = useState<IAuthor[] | []>([])
    const [comments, setComments] = useState<IComment[] | []>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [error, setError] = useState<string|null>(null)

    useEffect(()=>{
        (async (): Promise<void> => {
            const authorsResponse = await fetchData({callback: () => getAuthorsRequest(), setError})
            setAuthors(authorsResponse)
            const commentsResponse = await fetchData({callback: () => getCommentsRequest(page), setError})
            setComments(addNestings(commentsResponse.data))
            setTotalPages(commentsResponse.pagination.total_pages)
        })()

    }, [])

    const loadMore = async (): Promise<void> => {
        const commentsResponse = await fetchData({callback: () => getCommentsRequest(page+1), setError})
        setComments([...comments, ...addNestings(commentsResponse.data)])
        setPage(commentsResponse.pagination.page)
        setTotalPages(commentsResponse.pagination.total_pages)
    }

    const shouldShowLoadMoreButton = totalPages && page < totalPages
    const {commentsCount, likesCount} = getCommentsCount(comments)

    return (
        <div className="app" style={{backgroundImage: `url(${background})`}}>
            <div className='content'>
                <div className='header'>
                    <div>{commentsCount} comments</div>
                    <div>
                        <LikeIcon/>
                        {likesCount}
                    </div>
                </div>
                <Comments comments={comments} authors={authors}/>
                {error && <div className='error'>{error}</div>}
                {shouldShowLoadMoreButton && <button onClick={loadMore}>Load More</button>}
            </div>
        </div>
    );
}

export default App;
