export class NoPetsFoundError extends Error {
  constructor() {
    super('We have no pets in this city yet')
  }
}
