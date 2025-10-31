import { Element } from 'slate'

export const ElementElement = {
  ...Element,
  isImageElement(element) {
    return Element.isElement(element) && element.type === 'image'
  },
}