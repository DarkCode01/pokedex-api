export const UserResponses: any = {
  validator: {
    name: 'Please, enter a name with 2 or more characters.',
    username: 'Please, enter a username with 3 or more characters.',
    email: 'Please, include a valid email.',
    password: 'Please, enter a password with 6 or more characters.',
    gender: 'Please, enter your gender. [male, female, others]',
  },
  auth: {
    validator: {
      emailOrUsername: 'Please include a valid username or email',
    },
    accountDoesNotExist: 'Oops! There is no user with these credentials.',
    accountIsDisable: 'Oops! Your account is temporarily deactivated.',
    badCredentials: 'Oops! Something in your credentials is wrong.',
  },
  usernameExists: 'the username cannot already exist in the database.',
  emailExists: 'the email cannot already exist in the database.',
}
