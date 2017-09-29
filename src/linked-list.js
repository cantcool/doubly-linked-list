const Node = require('./node');

class LinkedList {
    constructor() {
      this._tail = null;
      this._head = null;
      this.length = 0;
    }

    append(data) {
      let newNode = new Node(data);

      if(this._tail) {
        this._tail.next = newNode;
        newNode.prev = this._tail;
        this._tail = newNode;
      } else {
        this._head = newNode;
        this._tail = newNode;
      }

      this.length++;

      return this;
    }

    head() {
      if(this._head) {
        return this._head.data;
      } else {
        return null;
      }
    }

    tail() {
      if(this._tail) {
        return this._tail.data;
      } else {
        return null;
      }
    }

    at(index) {
      let current = this._head,
          i = 0;

      if(index < 0 || index > this.length - 1) {
        throw new Error("A missing element or a wrong index");
      }

      while(i < index) {
        current = current.next;
        i++;
      }

      return current.data;
    }

    insertAt(index, data) {
      let newNode = new Node(data),
          current = this._head,
          i = 0;

      if(index < 0 || index > this.length) {
        throw new Error("A missing element or a wrong index");
      }

      if(this.length === 0) {
        this._tail = this._head = newNode;
      }

      if(index === 0) {
        // ("ADD AS HEAD:")
        this._head.prev = newNode;
        newNode.next = this._head;
        this._head = newNode;
      } else if (index === this.length) {
        // ("ADD AS TAIL:")
        newNode.prev = this._tail;
        this._tail.next = newNode;
        this._tail = newNode;
      } else {
        // ("ADD IN MIDDLE:")
        while(i < index) {
          current = current.next;
          i++;
        }

        newNode.next = current;
        newNode.prev = current.prev;
        newNode.prev.next = newNode;
      }

      this.length++;

      return this;
    }

    isEmpty() {
      if(this._head !== null) {
        return false;
      }

      return true;
    }

    clear() {
      this._head = null;
      this._tail = null;
      this.length = 0;

      return this;
    }

    deleteAt(index) {
      let current = this._head,
          i = 0;

      if(index < 0 || index > this.length - 1) {
        throw new Error("A missing element or a wrong index");
      }

      while(i < index) {
        current = current.next;
        i++;
      }

      if(current.prev !== null) {
        current.prev.next = current.next;
      } else {
        this._head = current.next;
      }

      if(current.next !== null) {
        current.next.prev = current.prev;
      }

      this.length--;

      return this;
    }

    reverse() {
      let pivot,
          moving,
          i = 0;

      if(this.length === 1) {
        return this;
      }

      // console.log('before: ' + this._toString());

      pivot = this._tail;
      
      while(pivot.prev !== null) {
        moving = pivot.prev;
        pivot.prev = moving.prev;

        this._tail.next = moving;
        moving.prev = this._tail;
        this._tail = moving;
        moving.next = null;
     }
      
      this._head = pivot;

      // console.log('after: ' + this._toString());

      return this;
    }

    indexOf(data) {
      let current = this._head,
          i = 0;

      while(i < this.length) {
        if(current.data === data) {
          return i;
        }

        current = current.next;
        i++;
      }

      return -1;
    }

    /*_toString() {
      let current = this._head,
          i = 0,
          output = '      LinkedList. Length: ' + this.length +', Data: <';
      
      while(current !== null) {
        output = output + current.data;
        i++;

        if(current.next) {
          output = output + ', ';
          current = current.next;
        } else {
          break;
        }

        
      }

      return output + ">  in HEAD: " + this._head.data + ", in TAIL: " + this._tail.data + ", items: " + i;
    }*/

}

module.exports = LinkedList;
