import {ReactNode} from "react";
import {IAuthor, IComment} from "../../../../interface";

export interface CommentComponentProps {
    comment: IComment;
    authors: IAuthor[],
    children?: ReactNode;
}
