declare type example = {
  number: number,
  getAll(): Promise<number[]>
  getNumber(no: number): Promise<number>
}
