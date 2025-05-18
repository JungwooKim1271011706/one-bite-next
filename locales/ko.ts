import CGCProduct from "@/models/CgcProduct"
import CGCUser from "@/models/CgcUser"
import { Button, Navigation } from "@adminjs/design-system"
import { Dashboard } from "adminjs"


const ko = {
  language: 'ko',
  availableLanguages: ['en', 'pl', 'ko'],
  localeDetection: true,
  translations: {
    ko: {
      messages: {
        welcomeOnBoard_title: '천기초 - 관리자 페이지',
        welcomeOnBoard_subtitle: '베타페이지입니다...',
      },
      labels : {
        dashboard: '대시보드',
        navigation: '사이트맵',
        CGCUser: '사용자 관리 페이지',
        CGCProduct: '제품 관리 페이지',
        cgcdb: '천기초 관리자 페이지',
        filters: '상세 검색'
      },
      actions: {
        new: '추가하기',
        show: '상세보기',
        edit: '수정하기',
        delete: '삭제하기',
      },
      buttons : {
        logout: '로그아웃',
        filter: '필터',
        save: '확인',
        resetFilter: '초기화',
        applyChanges: '적용하기',
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
          }
        },
        CGCProduct: {
          properties: {
            _id: '문서정보',
            name: '제품명',
            expirationDate: '유통기한',
            expirationDateNewLot: '유통 기한2',
            suggestedRetailPrice: '권장 소매가',
            suggestedWholesalePrice: '권장 도매가',
            specification: '규격',
            category: '구분',
            type: '항목',
            itemFeatures: '제품 특징',
            imageA: '이미지A',
            imageB: '이미지B',
            __v: '0'
          }
        }
      }
    },
  },
}

export default ko