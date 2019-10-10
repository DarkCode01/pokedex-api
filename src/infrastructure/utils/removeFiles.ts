// Core
import fs from 'fs'
import path from 'path'

export const removeFile = (imageRoute: string) => {
  const imagePath = path.resolve(__dirname, `../../../uploads/${imageRoute}`)
  if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
}
