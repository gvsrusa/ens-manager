import React from 'react'
import { db } from 'redaxe'
import { selectNode } from '../updaters/nodes'
import classNames from 'classnames'

const handleSelectNode = (event, data) => {
  selectNode(data)
  event.stopPropagation()
}

const Node = ({ data }) => {

  let classes = classNames({
    node: true,
    selected: data.get('name') === db.get('selectedNode')
  })

  return <div className={classes}>
    <div onClick={(e) => handleSelectNode(e, data.get('name'))} className="node-details">{data.get('name')}</div>

    <div className="child-nodes">
      {data.get('nodes').size > 0 ? data.get('nodes').map(node => <Node key={node.get('name')} data={node} />) : ''}
    </div>
  </div>
}


const Nodes = () => (
  <div className="nodes-root">
    <div className="nodes-inner">
      {db.get('nodes').map(node => <Node key={node.get('owner')} data={node} />)}
    </div>
  </div>
)

export default Nodes
