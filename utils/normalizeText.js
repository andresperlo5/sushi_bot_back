const normalizeText = (text) => {
  const txtNormalize = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()

  return txtNormalize
}

module.exports = normalizeText
