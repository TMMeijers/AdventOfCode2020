class ListNode {
  constructor(value = null) {
    this.value = value
    this.next = null
    this.previous = null
  }

  get isHead() {
    return this.previous == null
  }

  get isTail() {
    return this.next == null
  }
}
ListNode.prototype.toString = function() {
  return `(${this.value})`
}

class LinkedList {
  constructor(node = null) {
    this.values = {}
    this.length = 0
    if (node !== null) {
      this.push(node)
    }
  }

  push(data) {
    const node = data instanceof ListNode ? data : new ListNode(data)
    this.values[node.value] = node

    node.next = null
    if (this.head == null) {
      this.head = node
    }
    const oldTail = this.tail
    if (oldTail != null) {
      oldTail.next = node
    }

    node.previous = oldTail
    this.tail = node
    this.length++
  }

  find(value) {
    return this.values[value]
  }

  includes(value) {
    return !!this.find(value)
  }

  at(index) {
    let node = this.head
    for (let i = 0; i < index; i++) {
      if (!node) {
        return
      }
      node = node.next
    }
    return node
  }

  toArray() {
    const items = []
    let node = this.head
    while (node != null) {
      items.push(node.value)
      node = node.next
    }
    return items
  }

  concat(list) {
    const copy = this.slice()
    let currentNode = list.head
    while (currentNode != null) {
      copy.push(currentNode.value)
      currentNode = currentNode.next
    }
    return copy
  }

  slice(start, end) {
    let startNode = (start == null ? this.head : this.at(start)) || this.tail
    return this.sliceFromNode(startNode, end)
  }

  sliceFromNode(startNode, end) {
    const list = new LinkedList()
    let done = false
    let count = 0

    let currentNode = startNode
    while (!done) {
      list.push(currentNode.value)
      currentNode = currentNode.next
      count++
      done = end == null ? currentNode == null : count === end
    }
    return list
  }

  splice(start, deleteCount, insertList) {
    const firstSpliceNode = this.at(start)
    return this.spliceFromNode(this.at(start), deleteCount, insertList)
  }

  spliceFromNode(firstSpliceNode, deleteCount, insertList) {
    const beginNode = firstSpliceNode == null ? this.tail : firstSpliceNode.previous
    let endNode = firstSpliceNode

    const splicedList = new LinkedList()
    for (let i = 0; i < deleteCount; i++) {
      if (endNode == null) {
        break
      }

      let nextNode = endNode.next
      splicedList.push(endNode)
      this.length--
      endNode = nextNode
    }

    if (insertList) {
      this.length += insertList.length
      // < (beginNode) < (insertList) > (...) >
      if (beginNode) {
        beginNode.next = insertList.head
        insertList.head.previous = beginNode
      }
      // < < (insertList) > (...) >
      if (!beginNode){
        this.head = insertList.head
      }

      // < (...) < (insertList) > (endNode) >
      if (endNode) {
        endNode.previous = insertList.tail
        insertList.tail.next = endNode
      }
      // < (...) < (insertList) > >
      if (!endNode) {
        this.tail = insertList.tail
      }
    }
    if (!insertList) {
      // < (...) (beginNode) (endNode?) >
      if (beginNode) {
        beginNode.next = endNode
      }
      // < (endNode?) >
      if (!beginNode){
        this.head = endNode
      }

      // < (beginNode?) (endNode) >
      if (endNode) {
        endNode.previous = beginNode
      }
      if (!endNode) {
        this.tail = beginNode
      }
    }

    return splicedList
  }

  static fromArray(items) {
    const list = new LinkedList()
    items.forEach((data) => {
      const node = new ListNode(data)
      list.push(node)
    })
    return list
  }

  static from(list) {
    return list.slice()
  }
}

LinkedList.prototype.toString = function() {
  let output = 'LinkedList < '
  let next = this.head
  while (next != null) {
    output += `(${next.value})`
    next = next.next
    if (next != null) {
      output += ', '
    }
  }

  output += ' >'
  return output
}

module.exports = LinkedList
