import React from 'react';
import '../CSS/twitter.css'; // Assuming we'll separate the Twitter CSS

interface TwitterEmbedProps {
  tweetText: string;
  author: string;
  tweetUrl: string;
  date: string;
  profilePic?: string; // Option\ profile picture URL
  verified?: boolean; // Optional verified badge
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({
  tweetText,
  author,
  date,
  profilePic = 'https://via.placeholder.com/48', // Default placeholder
}) => {
  return (
    <div className="twitter-card-wrapper">
      <div className="twitter-tweet">
        <div className="twitter-header">
          <img
            src={profilePic}
            alt={`${author}'s profile`}
            className="twitter-profile-pic"
          />
          <span className="twitter-author">{author}</span>
          <img
            src="/images/Home/checkmark.png"
            alt="Verified"
            className="twitter-verified"
            style={{ width: '16px', height: '16px' }}
          />
          <span className="twitter-date">{date}</span>
        </div>
        <p>{tweetText}</p>
      </div>
    </div>
  );
};

export default TwitterEmbed;