import { IOperation } from 'alcaeus/types/Resources'
import { expand } from '@zazuko/rdf-vocabularies'

export function getRequestBody(operation: IOperation, formValue: any) {
  const fileProperties = operation.expects.supportedProperties
    .filter(sp => sp.writable)
    .filter(sp => sp.property.range && sp.property.range.id === expand('schema:ImageObject'))
    .map(sp => sp.property)

  if (fileProperties.length === 0) {
    return JSON.stringify(formValue)
  }

  const formData = new FormData()
  fileProperties.reduce((previousValue, property) => {
    const files = formValue[property.id]
    // eslint-disable-next-line no-param-reassign
    delete formValue[property.id]

    if (files instanceof FileList) {
      for (let i = 0; i < files.length; i += 1) {
        previousValue.append(property.id, files[i], files[i].name)
      }
    }

    return previousValue
  }, formData)

  if (Object.keys(formValue).filter(key => key !== '@type').length > 0) {
    formData.append('json-ld', JSON.stringify(formValue))
  }

  return formData
}
