export type TBucketEl = [string, string | number];

export type TStatus = {
  status: string;
  message: string;
};

export interface IBucket {
  hash: number;
  data: TBucketEl[];
}
