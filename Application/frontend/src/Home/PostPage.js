import React from "react";
import { useState, useEffect } from "react";
import {useParams } from "react-router";
import "../Styling/PostPage.css";
const PostPage = (props) => {
  //--------------------------------------------------------------------------------
  const { id } = useParams();
 
  return (
    <div className="PostPage">
      <div className ="post-wrapper">
        <div className="post-author-wrapper">
          <div className="profile_pic_wrapper"><img src="https://img.fireden.net/ic/image/1479/28/1479288725496.jpg"/></div>
          <p className="header">Ruan Jian</p>
          <div className="like-wrapper">
            <h3 className="like-number">23</h3>
            <div className="like-icon">
            <img src="https://img.icons8.com/plasticine/44/000000/like--v1.png"/>
            </div>
          </div>
        </div>
        <div className="post-image-wrapper">
          <img src="https://i.pinimg.com/originals/72/a0/1d/72a01dafce6b802c4716eaf9274c8018.jpg" alt="image is not here" />
        </div>
      </div>
      <div className="post-comment-wrapper">
        <div className="post-comment-header">
          <h2>Comments</h2>
        </div>
        <div className="post-comment-comments"> 
          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3></div>
            </div>
            <div className="comment" id="1">
              <p> Lovely</p>
            </div>


          </div>



          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3></div>
            </div>
            <div className="comment" id="2">
              <p> LovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovelyLovely</p>
            </div>


          </div>





          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3></div>
            </div>
            <div className="comment" id="3">
              <p> Lovely</p>
            </div>


          </div>




          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3></div>
            </div>
            <div className="comment" id="4">
              <p> Lovely</p>
            </div>


          </div>





          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3> </div>
            </div>
            <div className="comment" id="5">
              <p> Lovely</p>
            </div>


          </div>





          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3> </div>
            </div>
            <div className="comment" id="6">
              <p> Lovely</p>
            </div>


          </div>





          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3></div>
            </div>
            <div className="comment" id="7">
              <p> Lovely</p>
            </div>


          </div>





          <div className="comment-wrapper">
            <div className="comment-author-wrapper">
              <div className="profile-pic">
                <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/hzmk6XkfMb6ZoRtdASlX_InoZeljak2.jpg"/>
              </div>
              <div className="username"><h3>Fabio</h3></div>
            </div>
            <div className="comment" id="8">
              <p> Lovely</p>
            </div>


          </div>

        </div>

      </div>

    </div>
  );
};

export default PostPage;
