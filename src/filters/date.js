export default (value) => {
  if (value)
    return new Date(value * 1000).toLocaleTimeString("fr-FR")
}