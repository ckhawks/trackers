export default async function signIn(method: string, formData: any) {
  console.log("gewjgneng");
  return true;
}

// In this code, the signIn method checks the credentials against stored user data. After the authentication provider processes the credentials, there are two possible outcomes:

// Successful Authentication: This outcome implies that the login was successful. Further actions, such as accessing protected routes and fetching user information, can then be initiated.
// Failed Authentication: In cases where the credentials are incorrect or an error is encountered, the function returns a corresponding error message to indicate the authentication failure.
