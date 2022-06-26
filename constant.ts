export const RESTAURANT = 1;
export const ACCOMMODATION = 2;

export const EXPOSURE_MENU = 11;
export const ENTIRE_MENU = 12;
export const ROOMS = 21;

export const DAILY = 50;
export const NOTICE = 100;

export const RESTAURANT_ENG = 'restaurant';
export const ACCOMMODATION_ENG = 'accommodation';

export const EXPOSURE_MENU_ENG = 'exposure_menu';
export const ENTIRE_MENU_ENG = 'entire_menu';
export const ROOMS_ENG = 'rooms';

export const DAILY_ENG = 'daily'
export const NOTICE_ENG = 'notice'

export const CONTENTS_CODE: {
  [prop: string]: any;
} = {
  'restaurant': RESTAURANT,
  'exposure_menu': EXPOSURE_MENU,
  'entire_menu': ENTIRE_MENU,
  'accommodation': ACCOMMODATION,
  'rooms': ROOMS,
  'daily': DAILY,
  'notice': NOTICE
};

export const MODEL_STRING: {
  [props: string]: any;
} = {
  restaurant: 'Restaurant',
  exposure_menu: 'ExposureMenu',
  entire_menu: 'EntireMenu',
  accommodation: 'Accommodation',
  rooms: 'Rooms',
  daily: 'Daily',
  notice: 'Notice'
};

export const UPLOAD_PATH: {
  [prop: number]: any;
} = {
  [RESTAURANT]: '/restaurant/',
  [EXPOSURE_MENU]: '/exposure_menu/',
  [ACCOMMODATION]: '/accommodation/',
  [ROOMS]: '/rooms/',
  [NOTICE]: '/notice/'
};

export const UPLOAD_PATH_ENG: {
  [prop: string]: any;
} = {
  [RESTAURANT_ENG]: '/restaurant/',
  [EXPOSURE_MENU_ENG]: '/exposure_menu/',
  [ACCOMMODATION_ENG]: '/accommodation/',
  [ROOMS_ENG]: '/rooms/',
  [DAILY_ENG]: '/daily/',
  [NOTICE_ENG]: '/notice/'
};

export const CATEGORY_LIST: {
  [prop: number]: any;
} = {
  [RESTAURANT]: 'Restarunt',
  [EXPOSURE_MENU]: 'ExposureMenu',
  [ENTIRE_MENU]: 'EntireMenu',
  [ACCOMMODATION]: 'Accomodation',
  [ROOMS]: 'Rooms',
  [DAILY]: 'Daily',
  [NOTICE]: 'Notice'
};

export const ACCOMMODATION_BUSINESS_CODE_LIST = [
  '호텔업',
  '여관업',
  '휴양 콘도 운영업',
  '민박업',
  '기타 일반 및 생활 숙박시설 운영업',
  '숙박공유업',
  '그 외 기타 숙박업',
  '가족 호텔업',
  '호스텔업',
  '한국전통호텔업',
  '소형호텔업',
  '의료관광호텔업',
  '수상관광호텔업',
]

export const RESTAURANT_BUSINESS_CODE_LIST = [
  '한식 일반 음식점업',
  '중식 음식점업',
  '일식 음식점업',
  '서양식 음식점업',
  '출장 음식 음식점업',
  '치킨 전문점',
  '김밥 및 기타 간이 음식점업',
  '기관 구내식당업',
  '한식 면 요리 전문점',
  '한식 육류 요리 전문점',
  '한식 해산물 요리 전문점',
  '기타 외국식 음식점업',
  '피자, 햄버거, 샌드위치 및 유사 음식점업',
  '간이 음식 포장 판매 전문점',
  '일반 유흥 주점업',
  '무도 유흥 주점업',
  '생맥주 전문점',
  '기타 주점업',
  '제과점업',
  '커피 전문점',
  '간이 음식 포장 판매 전문점',
  '기타 비알코올 음료점업',
  '이동 음식점업',
];

export const REPORT_REASONS = [
  '스팸',
  '광고성 게시물',
  '욕설 및 비방',
  '음란물 배포',
  '지적 재산권 침해',
  '거짓 정보',
  '불법 상품 판매',
];