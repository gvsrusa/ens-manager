import getWeb3 from '../api/web3'

export const uniq = (a, param) =>
  a.filter((item, pos) =>
    a.map(mapItem => mapItem[param]).indexOf(item[param]) === pos
  )

export function getEtherScanAddr(){
  return getWeb3().then(({ networkId}) => {
    switch(networkId) {
      case 1:
      case "1":
        return "https://etherscan.io/"
      case 3:
      case "3":
        return "https://ropsten.etherscan.io/"
    }
  })
}

export async function ensStartBlock(){
  let { networkId } = await getWeb3()
  switch(networkId){
    case 1:
    case '1':
      return 3327417
    case 3:
    case "3":
      return 25409
  }
}

export async function openEtherScanPage(txId){
  let etherscanAddr = await getEtherScanAddr()
  let txLink = `${etherscanAddr}/tx/${txId}`
  window.open(`${etherscanAddr}/tx/${txId}`, "_blank");
}
