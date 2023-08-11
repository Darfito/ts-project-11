import './css/style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  //lapak formnya untuk masukin data
  const itemEntryForm =  document.getElementById("itemEntryForm")as HTMLFormElement
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void =>
  {
    event.preventDefault()

    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    const itemId: number = fullList.list.length
    ? parseInt(fullList.list[fullList.list.length-1].id)+1 : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)

    fullList.addItem(newItem)

    template.render(fullList)
  })

  // listener untuk clear item
  const clearItems = document.getElementById("clearItemButtons") as HTMLButtonElement
  clearItems.addEventListener("click", (): void=>{
    fullList.clearList()
    template.clear()
  })

  //load listnya setelah di clear

  fullList.load()
  template.render(fullList)
}
document.addEventListener("DOMContentLoaded", initApp)