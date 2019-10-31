export const forgotMessage = (url: string) =>
`<style type="text/css">
  @media only screen and (max-width:600px) {
    .st-br {
      padding-left: 10px !important;
      padding-right: 10px !important
    }

    p,
    ul li,
    ol li,
    a {
      font-size: 16px !important;
      line-height: 150% !important
    }

    h1 {
      font-size: 30px !important;
      text-align: center;
      line-height: 120% !important
    }

    h2 {
      font-size: 26px !important;
      text-align: center;
      line-height: 120% !important
    }

    h3 {
      font-size: 20px !important;
      text-align: center;
      line-height: 120% !important
    }

    h1 a {
      font-size: 30px !important;
      text-align: center
    }

    h2 a {
      font-size: 26px !important;
      text-align: center
    }

    h3 a {
      font-size: 20px !important;
      text-align: center
    }

    .es-menu td a {
      font-size: 14px !important
    }

    .es-header-body p,
    .es-header-body ul li,
    .es-header-body ol li,
    .es-header-body a {
      font-size: 16px !important
    }

    .es-footer-body p,
    .es-footer-body ul li,
    .es-footer-body ol li,
    .es-footer-body a {
      font-size: 14px !important
    }

    .es-infoblock p,
    .es-infoblock ul li,
    .es-infoblock ol li,
    .es-infoblock a {
      font-size: 12px !important
    }

    *[class="gmail-fix"] {
      display: none !important
    }

    .es-m-txt-c,
    .es-m-txt-c h1,
    .es-m-txt-c h2,
    .es-m-txt-c h3 {
      text-align: center !important
    }

    .es-m-txt-r,
    .es-m-txt-r h1,
    .es-m-txt-r h2,
    .es-m-txt-r h3 {
      text-align: right !important
    }

    .es-m-txt-l,
    .es-m-txt-l h1,
    .es-m-txt-l h2,
    .es-m-txt-l h3 {
      text-align: left !important
    }

    .es-m-txt-r img,
    .es-m-txt-c img,
    .es-m-txt-l img {
      display: inline !important
    }

    .es-button-border {
      display: block !important
    }

    a.es-button {
      font-size: 16px !important;
      display: block !important;
      border-left-width: 0px !important;
      border-right-width: 0px !important
    }

    .es-btn-fw {
      border-width: 10px 0px !important;
      text-align: center !important
    }

    .es-adaptive table,
    .es-btn-fw,
    .es-btn-fw-brdr,
    .es-left,
    .es-right {
      width: 100% !important
    }

    .es-content table,
    .es-header table,
    .es-footer table,
    .es-content,
    .es-footer,
    .es-header {
      width: 100% !important;
      max-width: 600px !important
    }

    .es-adapt-td {
      display: block !important;
      width: 100% !important
    }

    .adapt-img {
      width: 100% !important;
      height: auto !important
    }

    .es-m-p0 {
      padding: 0px !important
    }

    .es-m-p0r {
      padding-right: 0px !important
    }

    .es-m-p0l {
      padding-left: 0px !important
    }

    .es-m-p0t {
      padding-top: 0px !important
    }

    .es-m-p0b {
      padding-bottom: 0 !important
    }

    .es-m-p20b {
      padding-bottom: 20px !important
    }

    .es-mobile-hidden,
    .es-hidden {
      display: none !important
    }

    .es-desk-hidden {
      display: table-row !important;
      width: auto !important;
      overflow: visible !important;
      float: none !important;
      max-height: inherit !important;
      line-height: inherit !important
    }

    .es-desk-menu-hidden {
      display: table-cell !important
    }

    table.es-table-not-adapt,
    .esd-block-html table {
      width: auto !important
    }

    table.es-social {
      display: inline-block !important
    }

    table.es-social td {
      display: inline-block !important
    }
  }

  #outlook a {
    padding: 0;
  }

  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%;
  }

  .es-button {
    mso-style-priority: 100 !important;
    text-decoration: none !important;
  }

  a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
  }

  .es-desk-hidden {
    display: none;
    float: left;
    overflow: hidden;
    width: 0;
    max-height: 0;
    line-height: 0;
    mso-hide: all;
  }

  .es-button-border:hover {
    border-style: solid solid solid solid !important;
    background: #d6a700 !important;
    border-color: #42d159 #42d159 #42d159 #42d159 !important;
  }

  .es-button-border:hover a.es-button {
    background: #d6a700 !important;
    border-color: #d6a700 !important;
  }

  td .es-button-border:hover a.es-button-1 {
    background: #21386E !important;
    border-color: #21386E !important;
  }

  td .es-button-border-2:hover {
    background: #21386E !important;
    border-style: solid solid solid solid !important;
    border-color: #d98106 #d98106 #d98106 #d98106 !important;
  }
</style>
<div class="es-wrapper-color" style="background-color:#F6F6F6;">
  <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
  <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
    <tr style="border-collapse:collapse;">
      <td class="st-br" valign="top" style="padding:0;Margin:0;">
        <table cellpadding="0" cellspacing="0" class="es-content" align="center"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
          <tr style="border-collapse:collapse;">
            <td align="center" bgcolor="transparent"
              style="padding:80px 16px;Margin:0;background-color:transparent;background-position:left top;">
              <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                width="600"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                <tr style="border-collapse:collapse;">
                  <td align="left"
                    style="padding:0;Margin:0;padding-left:30px;padding-right:30px;padding-top:40px;border-radius:10px 10px 0px 0px;background-color:#FFFFFF;background-position:left bottom;"
                    bgcolor="#ffffff">
                    <table cellpadding="0" cellspacing="0" width="100%"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                      <tr style="border-collapse:collapse;">
                        <td width="540" align="center" valign="top" style="padding:0;Margin:0;">
                          <table cellpadding="0" cellspacing="0" width="100%"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left bottom;">
                            <tr style="border-collapse:collapse;">
                              <td align="center" style="padding:0;Margin:0;">
                                <h1
                                  style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#F89B1C;">
                                  Reset your password?</h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr style="border-collapse:collapse;">
                  <td align="left"
                    style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px;border-radius:0px 0px 10px 10px;background-position:left bottom;background-color:#FFFFFF;">
                    <table cellpadding="0" cellspacing="0" width="100%"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                      <tr style="border-collapse:collapse;">
                        <td width="540" align="center" valign="top" style="padding:0;Margin:0;">
                          <table cellpadding="0" cellspacing="0" width="100%"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;">
                            <tr style="border-collapse:collapse;">
                              <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;">
                                <p
                                  style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#212121;">
                                  You are receiving this email because you (or someone else) has requested the reset of
                                  a password. If you requested a password reset, click the button below.</p>
                              </td>
                            </tr>
                            <tr style="border-collapse:collapse;">
                              <td align="center" style="padding:10px;Margin:0;">
                                <span class="es-button-border es-button-border-2"
                                  style="border-style:solid;border-color:#F89B1C;background:#316AB2;border-width:0px;display:inline-block;border-radius:4px;width:auto;">
                                  <a
                                    href="${url}" class="es-button es-button-1" target="_blank"
                                    style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;color:#FFFFFF;border-style:solid;border-color:#316AB2;border-width:10px 20px 10px 20px;display:inline-block;background:#316AB2;border-radius:4px;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:20px;border-right-width:20px;">Reset
                                    Your Password
                                  </a>
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>`