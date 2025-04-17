export interface PagingParams {
  pageNumber: number;
  pageSize: number;
  [key: string]: any; // Cho phép thêm các trường lọc tùy ý ở cấp trên
}