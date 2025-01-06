export function formatAsRupiah(amount: number) {
  const formater = new Intl.NumberFormat("id-id", {
    style: 'currency',
    currency: 'IDR'
  })

  return formater.format(amount)
}
