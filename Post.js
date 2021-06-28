import React from 'react'
import Avatar from "@material-ui/core/Avatar";


function Post({username, caption, imageURL}) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar 
            className="post__avatar"
            alt="AyushKarn"
            src=""/>
            <h3>{username}</h3>
        </div>

        <img className="post__image" alt="Post" src={imageURL}></img>
        <h4 className="post__text"><strong>{username}: </strong>{caption}</h4>
          {/*Header->Avatar */}
          {/*Image*/}  
          {/*Caption*/}

        </div>
    )
}

export default Post
