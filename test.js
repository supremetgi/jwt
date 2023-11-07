async function fetchUserDetails(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    const postsResponse = await fetch(`/api/posts?userId=${userId}`);
    const postsData = await postsResponse.json();
    // Process and use user and post data here
    return { user: userData, posts: postsData };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage of the async function
fetchUserDetails(123)
  .then((data) => {
    console.log('User details:', data);
  })
  .catch((error) => {
    console.error('Error fetching user details:', error);
  });
