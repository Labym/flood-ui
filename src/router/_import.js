module.exports = (file, path) => {
  if (!path) path = 'pages'
  return require(`../${path}/${file}.vue`)
}
