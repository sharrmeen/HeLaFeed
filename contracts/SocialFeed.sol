// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SocialFeed {

    // User structure
    struct User {
        address userAddress;
        string username;
        string bio;
    }
    
    // Post structure
    struct Post {
        uint postId;
        address author;
        string content;
        uint likes;
        uint[] commentIds;
        mapping(address => bool) likedBy;
    }

    // Comment structure
    struct Comment {
        uint commentId;
        string authorUsername;
        uint postId;
        string content;
    }

    // Storage
    mapping(address => User) public users;
    mapping(uint => Post) public posts;
    mapping(uint => Comment) public comments;

    uint public postCount;
    uint public commentCount;

    // Create a user
    function createUser(string memory _username, string memory _bio) public {
        require(bytes(users[msg.sender].username).length == 0, "User exists");
        users[msg.sender] = User(msg.sender, _username, _bio);
    }

    // Check if user is registered
    function isUserRegistered(address _user) public view returns (bool) {
        return bytes(users[_user].username).length != 0;
    }

    // Create a post
    function createPost(string memory _content) public {
        require(isUserRegistered(msg.sender), "User not found");
        postCount++;
        Post storage p = posts[postCount];
        p.postId = postCount;
        p.author = msg.sender;
        p.content = _content;
    }

    // Like a post
    function likePost(uint _postId) public {
        require(isUserRegistered(msg.sender), "User not found");
        Post storage p = posts[_postId];
        require(p.author != address(0), "Post not found");
        require(!p.likedBy[msg.sender], "Already liked");
        p.likes++;
        p.likedBy[msg.sender] = true;
    }

    // Unlike a post
    function unlikePost(uint _postId) public {
        require(isUserRegistered(msg.sender), "User not found");
        Post storage p = posts[_postId];
        require(p.author != address(0), "Post not found");
        require(p.likedBy[msg.sender], "Not liked yet");
        p.likes--;
        p.likedBy[msg.sender] = false;
    }

    // Check if post is liked by a user
    function isPostLikedByUser(uint _postId, address _user) public view returns (bool) {
        return posts[_postId].likedBy[_user];
    }

    // Comment on a post
    function commentOnPost(uint _postId, string memory _content) public {
        require(isUserRegistered(msg.sender), "User not found");
        require(posts[_postId].author != address(0), "Post not found");
        commentCount++;
        Comment storage c = comments[commentCount];
        c.commentId = commentCount;
        c.authorUsername = users[msg.sender].username;
        c.postId = _postId;
        c.content = _content;
        posts[_postId].commentIds.push(commentCount);
    }

    // Get all comments for a post
    function getCommentsForPost(uint _postId) public view returns (Comment[] memory) {
        uint count = posts[_postId].commentIds.length;
        Comment[] memory result = new Comment[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = comments[posts[_postId].commentIds[i]];
        }
        return result;
    }

    // Get post author's username
    function getPostAuthorUsername(uint _postId) public view returns (string memory) {
        return users[posts[_postId].author].username;
    }
}
