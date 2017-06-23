import React from 'react'
import { db } from 'redaxe'
import { connect } from 'react-redaxe'
import { updateReverseAddress } from '../updaters/nodes'
import { getName } from '../api/registry'
import { addNotification } from '../updaters/notifications'
import { setReverseRecordDetails } from '../updaters/nodes'
import { checkAddress } from '../api/web3'

async function handleGetReverseRecord(address){
  let isAddress = await checkAddress(address)
  if(isAddress){
    getName(address)
      .then(({name, resolverAddr}) => {
        setReverseRecordDetails({address, name, resolverAddr})
        addNotification(`Reverse record found for ${address}`)
      })
      .catch(err => {
        console.log(err)
        setReverseRecordDetails({address, name: '0x', resolverAddr: '0x'})
        addNotification('No reverse name record found at this address')
      })
  } else {
    addNotification("Not a valid Ethereum address")
  }
}

export const SearchReverseName = ({ handleGetReverseRecord, reverseRecordSearch }) => {

  return <div className="search-name">
    <div className="search-box">
      <input type="text" id="address" placeholder="0xfb12g53s..." onChange={(e) => updateReverseAddress(e.target.value)} />
    </div>
    <button className="get-details" onClick={() => handleGetReverseRecord(reverseRecordSearch)}>Search for reverse record</button>
  </div>
}

export default connect(db => ({
  handleGetReverseRecord,
  reverseRecordSearch: db.get('reverseRecordSearch')
}))(SearchReverseName)
