export const forgotMessage = (url: string) =>
  `<p>You are receiving this email because you (or someone else)
  has requested the reset of a password. <br/>
  If you requested a password reset, click the button below.</p>
  <a target="_blank" href="${url}">Reset password</a>`
