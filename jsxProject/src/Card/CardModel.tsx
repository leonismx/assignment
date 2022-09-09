export class Card {
  value: number;
  shown: boolean = false;
  id: number;

  constructor(value: number, shown: boolean, id: number) {
    this.value = value;
    this.shown = shown;
    this.id = id;
  }

  copy = (): Card => {
    return new Card(this.value, this.shown, this.id);
  };
}
