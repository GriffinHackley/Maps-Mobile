export default class Constants {
  constructor(constants) {
    this.constants = constants;
  }

  get(constant) {
    if (!this.constants[constant]) {
      throw new Error("Not a valid constant " + constant);
    }
    return constant;
  }
}
