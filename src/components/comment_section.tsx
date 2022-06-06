import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Divider, Paper, Grid, Avatar } from "@mui/material";

import { BASE_URL } from "../config";
import { API_KEY } from "../config";


const CommentSection = ({ video }:any) => {
  const [comments, setComments] = useState();
  const [commentView, setCommentView] = useState(false);

  let videoId:string;
  useEffect(() => {
    if (video) {
      videoId = video.id.videoId;
      getComments();
    }
  }, [video]);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`
      );
      setComments(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const viewReply = () => {
    setCommentView(!commentView);
  };

  return (
    <div className=" col-md-8">
      <div style={{ padding: 14 }}>
        <h4>Comments</h4>
        {(comments || []).map((comment:any) => {
          return (
            <Paper key={comment.id} style={{ padding: "40px 20px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    }
                  />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h6 style={{ margin: 0, textAlign: "left",fontWeight:"bold" }}>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </h6>
                  <p style={{ textAlign: "left" }}>
                    {comment.snippet.topLevelComment.snippet.textOriginal}
                  </p>
                  <Grid container>
                    <Grid
                      item
                      md={2}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Avatar src="./images/like.png" alt="like" />
                      {comment?.snippet?.topLevelComment?.snippet.likeCount}
                    </Grid>
                    <Grid item md={2}>
                      <Avatar src="./images/dislike.png" alt="like" />
                    </Grid>
                  </Grid>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    {moment(
                      comment.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </p>

                  {(comment?.replies?.comments || []).map((reply:any) => {
                    return (
                      <>
                        {commentView ? (
                          <>
                            <Grid
                              key={reply.id}
                              container
                              wrap="nowrap"
                              spacing={2}
                            >
                              <Grid item>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={reply.snippet.authorProfileImageUrl}
                                />
                              </Grid>
                              <Grid justifyContent="left" item xs zeroMinWidth>
                                <h5 style={{ margin: 0, textAlign: "left" }}>
                                  {reply.snippet.authorDisplayName}
                                </h5>
                                <p style={{ textAlign: "left" }}>
                                  {reply.snippet.textOriginal}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                  {moment(reply.snippet.publishedAt).fromNow()}
                                </p>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                  {}
                  {comment?.replies ? (
                    <p onClick={viewReply} style={{ color: "#508ee0" }}>
                      {commentView ? "Hide replies" : `View replies`}
                    </p>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
