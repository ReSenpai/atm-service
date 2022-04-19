export enum Currency {
  RUB = 'RUB',
  EUR = 'EUR',
  USD = 'USD',
}

type WorkPeriods = {
  openDay: number;
  openTime: string;
  closeDay: number;
  closeTime: string;
};

type Limit = {
  currency: string;
  max: number;
  denominations: number[];
  amount: number;
};

type AtmInfoLimit = {
  currency: string;
  amount: number;
  withdrawMaxAmount: number;
  depositionMaxAmount: number;
  depositionMinAmount: number;
  withdrawDenominations: number[];
  depositionDenominations: number[];
  overTrustedLimit: boolean;
};

interface Point {
  id: string;
  brand: {
    id: string;
    name: string;
    logoFile: string;
    roundedLogo: boolean;
  };
  pointType: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phone: string[];
  limits: Limit[];
  workPeriods: WorkPeriods[];
  installPlace: string;
  atmInfo: {
    available: boolean;
    isTerminal: boolean;
    statuses: {
      criticalFailure: boolean;
      qrOperational: boolean;
      nfcOperational: boolean;
      cardReaderOperational: boolean;
      cashInAvailable: boolean;
    };
    limits: AtmInfoLimit[];
  };
}

interface Cluster {
  id: string;
  hash: string;
  bounds: {
    bottomLeft: {
      lat: number;
      lng: number;
    };
    topRight: {
      lat: number;
      lng: number;
    };
  };
  center: {
    lat: number;
    lng: number;
  };
  points: Point[];
}

export interface Clusters {
  trackingId: string;
  payload: {
    hash: string;
    zoom: number;
    bounds: {
      bottomLeft: {
        lat: number;
        lng: number;
      };
      topRight: {
        lat: number;
        lng: number;
      };
    };
    clusters: Cluster[];
    time: string;
    status: string;
  };
}
