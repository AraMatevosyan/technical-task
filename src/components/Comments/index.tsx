import React, {FunctionComponent} from "react";
import Comment from './components/Comment'
import {CommentsComponentProps} from "./interface";
import "./style.css";

const Comments: FunctionComponent<CommentsComponentProps> = ({ comments, authors }) => {
    return (
        <ul className='comments'>
            {comments && comments.map(comment => (
                <Comment key={comment.id} comment={comment} authors={authors} />
            ))}
        </ul>
    );
};

export default Comments;
