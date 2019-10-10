import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users/')
  },
  filename: (req, file, cb) => {
    if (req.user && file) {
      const { mimetype } = file
      const { username, uuid } = req.user
      const name = `${username}-${Date.now()}-${uuid}.${mimetype.split('/')[1]}`
      cb(null, name)
      req.user.picture = name
    }
  }
})
export const isUpload = multer({
  storage,
  limits: {
    fileSize: 25000000
  },
  fileFilter: (req, file, cb) => {
    const onlyExtension = /jpeg|png|jpg|gif|PNG/
    const mimetype = onlyExtension.test(file.mimetype)
    const fileExtension = onlyExtension.test(path.extname(file.originalname))

    if (mimetype && fileExtension) {
      cb(null, true)
    } else cb(new Error('efra'), false)
  }
}).single('picture')
