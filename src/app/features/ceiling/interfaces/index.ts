export interface CeilingPerf extends CreatePerf, DateData {
  id: number;
  ceiling?: Ceiling;
}

export interface Ceiling extends CreateCeiling, DateData {
  id: number;
  performces?: CeilingPerf[];
}

export interface CeilingPerfUpdate {
  perfs: string;
}

export interface CreatePerf {
  name: string;
}

export interface CreateCeiling {
  name: string;
  imageUrl: string;
  reference: string;
  perfs?: string;
  price: number;
  width: number;
  height: number;
}

export interface UpdateCeiling {
  name?: string;
  imageUrl?: string;
  reference?: string;
  price?: number;
  width?: number;
  height?: number;
}

interface DateData {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
