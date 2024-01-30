import { useState } from "react"
import './comment.css'

const Comment = () => {


    return (
      <div className="commentContainer">
        <div className="title-container">
          <h1 className="title-text">From: Username, created at: RIGHT NOW</h1>
        </div>
        <div className="body-container">
          <p className="comment-body">
            Comment Body ok???????? asdlfjladksfjlasdjfladsjf laksd
            jflkasdjflk;adjsfl;kasjd flka sdlkfja dslkfjaldksfjklasdjflaksdjf
            l;kadsjf l;kasdjf
          </p>
        </div>
      </div>
    );
}

export default Comment