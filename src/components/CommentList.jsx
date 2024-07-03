import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

const CommentList = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/:movieId`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgyOWMzOTJiNjYwYzAwMTUzZDhkYzkiLCJpYXQiOjE3MTk4MzU3MDUsImV4cCI6MTcyMTA0NTMwNX0.85A3dHcNjFbc4sL9LZjkz3-dgdqtBPDeaShJCQ-AVss', 
            },
          }
        );
        if (!response.ok) {
          throw new Error("Errore nel recupero dei commenti");
        }
        const commentsData = await response.json();
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h3 className="mt-4">Comments</h3>
      {comments.map((comment) => (
        <Card key={comment._id} className="bg-dark text-white mb-3">
          <Card.Body>
            <Card.Text>{comment.comment}</Card.Text>
            <Card.Text>By: {comment.user}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
