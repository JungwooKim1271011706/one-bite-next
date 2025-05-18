import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import CGCProduct from '@/models/CgcProduct'
import CGCUser from '../src/models/CgcUser'
import { comparePassword, hashPassword } from '@/lib/password/password'
import ko from '../locales/ko'

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  locale: ko,
  resources: [
    {
      resource: CGCProduct,
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
          }
        }
      }
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
