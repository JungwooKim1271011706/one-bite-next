// locales/ko.ts
import { Locale } from 'adminjs'

// const ko: Locale = {
const ko = {
  availableLanguages: ['en', 'pl', 'ko'],
  localeDetection: true,
  language: 'ko',
  translations: {
    labels: {
      loginWelcome: '천기초 관리자 로그인',
      CGCUser: '사용자',
      CGCProduct: '천기초 제품',
    },
    messages: {
      loginWelcome: '로그인을 진행해주세요',
    },
    properties : {
      email: 'ID',
      password: '비밀번호'
    },
    resources: {
      CGCUser: {
        properties: {
          id: '아이디',
          password: '비밀번호',
          role: '권한',
          name: '이름',
          email: '이메일',
          position: '직급',
          department: '부서',
          phoneNumber: '핸드폰번호',
        },
      },
      CGCProduct: {
        messages: {
          name: '제품명',
        },
        properties: {
          name: '제품명',
          expirationDate: '유통기한',
          expirationDateNewLot: '유통 기한2',
          suggestedRetailPrice: '권장 소매가',
          suggestedWholesalePrice: '권장 도매가',
          specification: '규격',
          category: '구분',
          type: '항목',
          itemFeatures: '제품 특징',
        },
      },
    },
  },
}

export default ko