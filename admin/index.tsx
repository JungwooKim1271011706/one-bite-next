import AdminJS, { ComponentLoader } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import CGCProduct from '@/models/CgcProduct'
import CGCUser from '../src/models/CgcUser'
import { comparePassword, hashPassword } from '@/lib/password/password'
import ko from '../locales/ko'
import uploadFileFeature from '@adminjs/upload'
import path from 'path';
import { fileURLToPath } from 'url';
import { SafeLocalProvider } from './upload/customLocalProvider'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AdminJS.registerAdapter(AdminJSMongoose);

const componentLoader = new ComponentLoader();

const uploadFeature = uploadFileFeature({
  componentLoader,
  // provider : new SafeLocalProvider('uploads/audio'),
  provider: {
    local: {
      bucket: 'uploads/audio',
      opts: {
        baseUrl: undefined,
      }
    }
  },
  properties: {
    key: 'audioFileKey',
    mimeType: 'audioFileMimeType',
    file: 'audioFile',
  },
  uploadPath: (record, filename) => {
  return `${Date.now()}-${filename}`;
  },
});

componentLoader.override(
  'UploadShowComponent',
  path.join(__dirname, './components/UploadShowComponent.js')
);

const adminJs = new AdminJS({
  componentLoader,
  locale: ko,
  resources: [
    {
      resource: CGCProduct,
      features: [
       uploadFeature,
      ],
      options: {
        id: 'CGCProduct',
        properties: {
          name : {
            label : "이름",
          },
          category: {

          },
          id: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          _id: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          audioFileKey: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          audioFileMimeType: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          audioFile: {
            position: 1000,
            isVisible: { list: true, show: true, edit: true, filter: false},
          },
        }
      },
    },
    {
      resource: CGCUser,
      options: {
        properties: {
          _id: { isVisible: false },
          name: { isTitle: true},
          email: {},
          position: {},
          department: {},
          phoneNumber: {},
          password: {
            isVisible: { list: false, show: false, edit: true, filter: false },
            type: 'password',
          },
          role: {
            availableValues: [
              { value: 'admin', label: '관리자' },
              { value: 'user', label: '일반 사용자' },
            ],
          },
        },
        actions: {
          new: {
            before: async (request: { payload: { password: any } }) => {
              if (request.payload?.password) {
                request.payload.password = await hashPassword(request.payload.password)
              }
              return request
            },
          },
          edit: {
            before: async (request: { payload: { password: string } }) => {
              if (request.payload?.password) {
                request.payload.password = await hashPassword(request.payload.password)
              }
              return request
            },
          },
        },
      },
    }
  ],
  rootPath: '/',
});


const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (id, password) => {
    const user = await CGCUser.findOne({ id })
    if (user && await comparePassword(password, user.password)) {
      if (user.role !== 'admin') {
        console.log(`❌ 권한 없음: ${user.id}`)
        return null // 권한 없는 사용자 차단
      }
      return user
    }
    return null
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'cookie-secret',
})

export { adminJs, router }
