export interface IPaddleService {
  generatePayLink: (userId: number) => Promise<string>;
}
