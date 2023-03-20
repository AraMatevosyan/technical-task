import {IAuthor, IComment} from "../../interface";

export interface CommentsComponentProps {
    comments: IComment[];
    authors: IAuthor[],
}
