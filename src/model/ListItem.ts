export interface Item {}

export default class ListItem implements Item {
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}
  get id(): string {
    return this._id;
  }

  set id(newId: string) {
    this._id = newId;
  }

  get item(): string {
    return this._item;
  }

  set item(newItem: string) {
    this._item = newItem;
  }
  get checked(): boolean {
    return this._checked;
  }

  set checked(checked: boolean) {
    this._checked = checked;
  }

}
