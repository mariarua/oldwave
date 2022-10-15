export const getUser = async (token) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
        token.access_token
    );
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
};
