
export interface Fish {
  name: string,
  price: number,
  weight: number,
  catched: Date,
}

export class Sardin implements Fish {
  name: string;
  price: number;
  weight: number;
  catched: Date;

  constructor(
    weight: number = 1,
    catched: Date = new Date(),
    name: string = "sardin",
    price: number = 10000,
  ) {
    this.name = name
    this.price = price
    this.weight = weight
    this.catched = catched
  }
}

export class Tuna implements Fish {
  name: string;
  price: number;
  weight: number;
  catched: Date;

  constructor(
    weight: number = 4,
    catched: Date = new Date(),
    name: string = "tuna",
    price: number = 50000,
  ) {
    this.name = name
    this.price = price
    this.weight = weight
    this.catched = catched
  }
}

export class Seabass implements Fish {
  name: string;
  price: number;
  weight: number;
  catched: Date;

  constructor(
    weight: number = 2,
    catched: Date = new Date(),
    name: string = "seabass",
    price: number = 20000,
  ) {
    this.name = name
    this.price = price
    this.weight = weight
    this.catched = catched
  }
}
