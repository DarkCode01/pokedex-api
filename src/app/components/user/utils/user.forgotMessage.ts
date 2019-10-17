export const forgotMessage = (url: string) =>
  `<p>You are receiving this email because you (or someone else)
  has requested the reset of a password.
  Please make a PUT request to:</p><a target="_blank" href="${url}">Reset password</a>`
