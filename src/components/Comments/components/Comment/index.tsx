import React, {FunctionComponent} from "react";
import {CommentComponentProps} from "./interface";
import LikeIcon from "../../../LikeIcon";
import Comments from "../../index";
import {getAuthorInfo, timeAgo} from "../../../../utils";
import "../../style.css";

const Comment: FunctionComponent<CommentComponentProps> = ({comment, authors, children}) => {
    const {name, avatar} = getAuthorInfo(authors, comment)

    return (
        <li className='commentWrapper'>
            <div className='comment'>
                <img className='avatar' src={avatar}/>
                <div className='commentContent'>
                    <div className='commentHeader'>
                        <div className='author'>
                            <div>{name}</div>
                            <div className='commentDate'>{timeAgo(comment.created)}</div>
                        </div>
                        <div className='likes'>
                            <LikeIcon liked={!!comment.likes}/>
                            <span>{comment.likes}</span>
                        </div>
                    </div>
                    <div className='commentText'>{comment.text}</div>
                </div>
            </div>
            <div className='nestedComments'>
                {comment.nested && <Comments comments={comment.nested} authors={authors}/>}
            </div>
        </li>
    );
}

export default Comment;
