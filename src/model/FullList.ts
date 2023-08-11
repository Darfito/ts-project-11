import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  //private karena bakal hanya membuat satu instance
  private constructor(private _list: ListItem[] = []) {}
  // get the data
  get list(): ListItem[] {
    return this._list;
  }

  // save data
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  load(): void {
    const storedList: string | null = localStorage.getItem("myList")
    //type guard
    if(typeof storedList !== "string") return

    const parsedList: {
        _id: string,
        _item:string,
        _checked: boolean
    }[] = JSON.parse(storedList)

    parsedList.forEach(itemObj => {
        const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
        FullList.instance.addItem(newListItem)
    })
  }

  //hilangin semua list
  clearList(): void {
    //ngosongin
    this._list = [];
    // save datanya lagi
    this.save();
  }
  // nambah Item
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }
  // hapus item
  // id diperlkan sebagai key nya
  removeItem(id: string): void {
    //this._list nya akan mengambil nilai yang di filter berdasarkan id
    //Jika item.id tidak sama dengan id yang diberikan (kondisi item.id !== id bernilai true), maka elemen tersebut akan disertakan dalam array baru yang dihasilkan oleh filter.
    //Jika item.id sama dengan id yang diberikan (kondisi item.id !== id bernilai false), maka elemen tersebut akan diabaikan dan tidak termasuk dalam array baru.
    //Setelah filter selesai, array baru yang hanya berisi elemen-elemen dengan ID yang tidak sama dengan id akan ditugaskan kembali ke properti _list. Ini mengakibatkan elemen dengan ID yang sesuai dihapus dari daftar.
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }


}
