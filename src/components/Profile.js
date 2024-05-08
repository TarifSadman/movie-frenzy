import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Duis nec auctor diam. Aliquam hendrerit sodales risus, sed elementum diam laoreet ac. Sed a nisi sed nunc viverra bibendum. Cras sed leo in sem finibus varius. Cras ut convallis ex. Nullam sit..."
  },
  {
    id: 2,
    title: "Cras nec fringilla urna",
    content:
      "Quisque erat odio, vehicula non diam eu, aliquam porttitor justo. Maecenas porta, arcu non vestibulum scelerisque, dui urna interdum ante, ut rutrum dolor odio eget velit. Fusce tempor..."
  },
  {
    id: 3,
    title: "Suspendisse",
    content:
      "Suspendisse tempus dignissim dapibus. In ut euismod orci. Ut cursus dictum ante quis facilisis. Etiam pharetra nulla non ultrices ultrices. Maecenas vulputate risus at diam bibendum..."
  }
];

const UserPost = ({ title, content }) => (
  <div className="user-post">
    <h1 className="user-post__header">{title}</h1>
    <div className="user-post__content">{content}</div>
  </div>
);

const Profile = () => {
  return (
    <div className="container">
     <div className="profile-header">
     <Link to="/">
      <div className="back-button">
        <ArrowLeftOutlined />
      </div>
      </Link>
      <h1 className="title">Go Back</h1>
    </div>
      <div className="user-profile">
        <div className="user-profile__wrapper">
          <div className="user-profile__background" />
          <div className="user-profile__name">
            <p>Alice Wonderland</p>
            <span>Aliquam ornare augue ac nulla</span>
          </div>
          <div className="user-profile__image" />
        </div>
        <div className="user-profile__follow">
          <p>
            0 <p>Following</p>
          </p>
          <div className="user-profile__add">
            <span>+</span>
          </div>
          <p>
            1 <p>Follower</p>
          </p>
        </div>
      </div>
      <div className="user-posts">
        {posts.map(post => (
          <UserPost key={post.id} title={post.title} content={post.content} />
        ))}
      </div>
    </div>
)
};

export default Profile;
