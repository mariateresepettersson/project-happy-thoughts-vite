import { useState } from 'react';

export const SingleMessage = ({ singleMessage, fetchPosts }) => {
    const [numLikes, setNumLikes] = useState(singleMessage.hearts);
    const [liked, setLiked] = useState(false);

    const handleLikeClick = async () => {
        // Check if the user has already liked the message
        if (!liked) {
            try {
                // Send a POST request to like the thought
                await fetch(
                    `https://marias-happy-thoughts-api.onrender.com/thoughts/${singleMessage._id}/like`,
                    {
                        method: "POST",
                    }
                );

                // Increment the number of likes
                setNumLikes(numLikes + 1);
                // Mark the message as liked
                setLiked(true);
                // Fetch updated posts
                fetchPosts();
            } catch (error) {
                console.error("Failed to like the message", error);
            }
        }
    };

    // Calculate the time difference between the current time and createdAt time
    const createdAt = new Date(singleMessage.createdAt);
    const currentTime = new Date();
    const timeDifferenceInSeconds = Math.floor(
        (currentTime - createdAt) / 1000
    );

    // Format the timestamp based on the time difference
    let timestamp;

    if (timeDifferenceInSeconds < 60) {
        timestamp = "Less than a minute ago";
    } else if (timeDifferenceInSeconds < 3600) {
        const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
        timestamp = `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
    } else {
        const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
        timestamp = `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
    }

    return (
        <div className="message-wrapper">
            <p>{singleMessage.message}</p>
            <div className="message-details">
                <div className="likes-section">
                    <button
                        type="button"
                        id="likeBtn"
                        className={`like-btn ${liked ? "liked" : ""}`}
                        onClick={handleLikeClick}
                    >
                        <span className="emoji" aria-label="heart emoji">❤️</span>
                    </button>
                    <span className="num-likes">x{numLikes}</span>
                </div>
                <div className="info-time">{timestamp}</div>
            </div>
        </div>
    );
};


// Explanation:
// This SingleMessage component is designed to display individual messages from an API and manage the liking functionality. 
// It renders a message, a like button, the number of likes, and the time elapsed since the message was posted, calculated using moment.js. 
// When a user clicks the like button, a POST request is sent to the API to increment the like count for that specific message, the local like count state (numLikes) is updated, and the fetchPosts function is called to refresh the message list. 
// The component also visually indicates whether a message has been liked by the user by changing the color of the like button.
// Hint This component does not use the useEffect hook at all ;)
// It's a POST method :)

// Here is a hint of that function :)
// const onLikeIncrease = async () => {
//   // Defining options for the fetch API call, specifying that the method should be "POST"
//   // PROMISE LAND;)
//   // - Making a POST request to the API to like a message, using the message's `_id` property to target the correct message
//   // - Parsing the response from the API as JSON
//   // - Updating the `numLikes` and `liked` state variables and fetching the updated posts
//   // - Logging any errors that occur during the fetch operation to the console
// };
