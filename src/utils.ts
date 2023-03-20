import {IAuthor, IComment} from "./interface";

export const getAuthorInfo = (authors: IAuthor[], comment: IComment): {avatar?: string, name?: string} => {
    const author = authors.find((author) => author.id === comment.author)
    const avatar = author?.avatar
    const name = author?.name
    return {avatar, name}
}

export const getCommentsCount = (comments: IComment[]) => {
    let likesCount = 0
    let commentsCount = 0

    const counter = (data: IComment[]) => {
        data.forEach((item)=> {
            commentsCount ++
            if(item.likes) {
                likesCount += item.likes
            }
            if(item.nested) {
                counter(item.nested);
            }
        })
    }
    counter(comments)
    return {likesCount, commentsCount};
}

export const addNestings = (data: IComment[]): IComment[] => {
    let result: IComment[] = [];

    data.forEach(item => {
        if (item.parent) {
            let parent = data.find(i => i.id === item.parent)
            if (parent) {
                parent.nested = []
                parent.nested.push(item);
            }
        } else {
            result.push(item);
        }
    })
    return result;
}

export const timeAgo = (dateParam: string): string|null => {
    if (!dateParam) {
        return null;
    }

    const date = new Date(dateParam);
    const today = new Date();
    const seconds = Math.round((Number(today) - Number(date)) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(seconds / 3600);
    const isToday = today.toDateString() === date.toDateString();

    if (seconds < 60) {
        return 'now';
    } else if (minutes < 60) {
        return `${ minutes } minutes ago`;
    } else if (hours === 1 && isToday) {
        return `${ hours } hour ago`;
    }else if (hours > 1 && isToday) {
        return `${ hours } hours ago`;
    }

    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}


export const fetchData = async <T = unknown>({callback, setError} : {callback: () => T, setError: (e: string| null) => void}): Promise<T> => {
    try {
        const data = await callback();
        setError(null)
        return data
    } catch (err) {
        setError('Something went wrong, please try again.')
        throw(err)
    }
};
