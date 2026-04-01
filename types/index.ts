export interface CityScores {
  nomad: number;
  cost: number;
  internet: number;
  cafe: number;
  safety: number;
  climate: number;
  community: number;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string;
  thumbnail: string;
  scores: CityScores;
  monthlyCost: number;
  internetSpeed: number;
  tags: string[];
  reviewCount: number;
  currentNomads: number;
  rank: number;
  costBreakdown: {
    housing: number;
    food: number;
    transport: number;
    cafe: number;
    other: number;
  };
  bestSeasons: string[];
}

export interface Review {
  id: string;
  cityId: string;
  userId: string;
  userNickname: string;
  userJobType: string;
  scores: {
    internet: number;
    cafe: number;
    cost: number;
    safety: number;
    climate: number;
    community: number;
  };
  body: string;
  stayDuration: "1주 미만" | "1~4주" | "1~3개월" | "3개월+";
  season: string;
  tags: string[];
  helpfulCount: number;
  createdAt: string;
}

export interface User {
  id: string;
  nickname: string;
  jobType: string;
  bio: string;
  checkinCityId?: string;
  reviewCount: number;
  favoriteCount: number;
  visitedCities: number;
  createdAt: string;
}

export interface QAPost {
  id: string;
  cityId: string;
  cityName: string;
  userId: string;
  userNickname: string;
  title: string;
  body: string;
  category: "숙소" | "카페" | "교통" | "비용" | "기타";
  answerCount: number;
  viewCount: number;
  isAdopted: boolean;
  createdAt: string;
}

export interface Meetup {
  id: string;
  cityId: string;
  cityName: string;
  organizerId: string;
  organizerNickname: string;
  title: string;
  description: string;
  date: string;
  time: string;
  maxParticipants: number;
  currentParticipants: number;
  location: string;
  tags: string[];
}
