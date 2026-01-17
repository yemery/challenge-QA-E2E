import { text } from "node:stream/consumers";


const homeLocators = {
    DropDownLocator: (text: string) => `//div/span[contains(text(),'${text}')]`,
    ButtonLocator: (text: string) => `//button[contains(text(),'${text}')]`,
    CheckBoxLocator: (text: string) => `//div/button[following-sibling::span[contains(text(),'${text}')]]`,
    CheckedStatusLocator: '/span[@data-state="checked"]',

};


export default homeLocators;