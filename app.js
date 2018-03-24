const SHA1 = require("crypto-js/sha1");

class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA1(this.index+','+JSON.stringify(this.data)+','+ this.previousHash +','+  this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let nasir = new Blockchain();
console.log('Mining block 1...');
nasir.addBlock(new Block(1,  { amount: 4 }));

console.log('Mining block 2...');
nasir.addBlock(new Block(2, { amount: 8 }));

console.log('Mining block 3...');
nasir.addBlock(new Block(3, { amount: 9 }));

console.log('Mining block 4...');
nasir.addBlock(new Block(4, { amount: 15 }));

console.log('Mining block 5...');
nasir.addBlock(new Block(5, { amount: 16 }));

console.log('Mining block 6...');
nasir.addBlock(new Block(6, { amount: 18 }));

console.log('Mining block 7...');
nasir.addBlock(new Block(7, { amount: 28 }));

console.log('Mining block 8...');
nasir.addBlock(new Block(8, { amount: 13 }));

console.log('Mining block 9...');
nasir.addBlock(new Block(9, { amount: 15 }));

console.log('Mining block 10...');
nasir.addBlock(new Block(10, { amount: 17 }));

