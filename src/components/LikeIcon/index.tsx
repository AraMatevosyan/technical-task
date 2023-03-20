import React, {FunctionComponent} from 'react'
import likedIcon from '../../assets/liked.png'
import unLikedIcon from '../../assets/unLiked.png'
import likeIcon from '../../assets/like.png'

interface LikeIconProps {
    liked?: boolean;
}

const LikeIcon: FunctionComponent<LikeIconProps> = ({liked}) => {
    const imgSrc = liked === undefined ? likeIcon : liked ? likedIcon : unLikedIcon;
    return (
        <img style={{margin: '0 5px'}} src={imgSrc}/>
    )
}

export default LikeIcon
