class Quests{
    constructor(value){
        this.value=value;
        this.next = null;
    }
}

class LinkedList{
    constructor(value){
        const node = new Quests(value);
        this.head= node;
        this.tail= this.head;
        this.size = 1;
    }

    push(value){
        const node = new Quests(value);
        if(!this.head){
            this.head = node;
            this.tail = node;
        }else{
            this.tail.next= node;
            this.tail = node
        }
        this.size+=1;
        return this
    }

    print(){
        return this;
    }
}

export default LinkedList;