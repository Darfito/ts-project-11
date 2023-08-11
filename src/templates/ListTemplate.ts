import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void
    render(fullList:FullList):void,
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;
  static instance : ListTemplate = new ListTemplate()
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    // buat ul
      this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    // ul kosong dimasukin
      this.clear()

      // buat li
      fullList.list.forEach(item => {
        const li = document.createElement("li") as HTMLLIElement
        li.className = "item"

        // buat input
        const check = document.createElement("input") as HTMLInputElement
        check.type = "checkbox"
        check.id = item.id
        check.checked = item.checked
        li.append(check)


        check.addEventListener('change', () => {
            item.checked = !item.checked
            fullList.save()
        })

        //buat label
        const label = document.createElement("label") as HTMLLabelElement
        label.htmlFor = item.id
        label.textContent = item.item

        // buat button hapus
        const button = document.createElement("button") as HTMLButtonElement
        button.className = 'button'
        button.textContent = "X"
        li.append(button)


        button.addEventListener('click', () => {
            fullList.removeItem(item.id)
            // panggil render lagi untuk nampilin list yang dah ga ada item yang diapus
            this.render(fullList)
        })
        // masukin ke ul nya
        this.ul.append(li)
      })
  }
}