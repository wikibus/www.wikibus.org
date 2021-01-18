import { Class, RuntimeOperation } from 'alcaeus'
import { schema } from '@tpluscode/rdf-ns-builders'

export function getRequestBody(operation: RuntimeOperation, formValue: any) {
  const fileProperties = (operation.expects[0] as Class).supportedProperty
    .filter(sp => sp.writable)
    .filter(
      sp =>
        sp.property?.range?.equals(schema.ImageObject) ||
        sp.property?.range?.equals(schema.MediaObject) ||
        false,
    )
    .map(sp => sp.property)

  if (fileProperties.length === 0) {
    return JSON.stringify(formValue)
  }

  const formData = new FormData()
  fileProperties.reduce((previousValue, property) => {
    if (!property) {
      return previousValue
    }

    const files = formValue[property.id.value]
    // eslint-disable-next-line no-param-reassign
    delete formValue[property.id.value]

    if (files instanceof FileList) {
      for (let i = 0; i < files.length; i += 1) {
        previousValue.append(property.id.value, files[i], files[i].name)
      }
    }

    return previousValue
  }, formData)

  if (Object.keys(formValue).filter(key => key !== '@type').length > 0) {
    formData.append('json-ld', JSON.stringify(formValue))
  }

  return formData
}
