let word = document.getElementById('boxW');
let button = document.getElementById('generate');
let notify = document.getElementById('alert');

let books = ['C#', 'Java', 'Python', 'PHP', 'Ruby', 'Vampire Diaries', 'The Originals', 'Alice in Wonderland', 'Toradora', 'Masamune Revenge', 'Sports Plus', 'Fitness and Nutrition', 'The People', 'Veganism']

const generator = () => {
    let num = Math.ceil(Math.random()*13);
    var picked = books[num];
    word.innerHTML= picked;
    console.log(num);
    return picked;
}

const warning = () => {
    console.log('hello');
    alert('You are moving to a new page!');
}

button.addEventListener("click", generator);
notify.addEventListener("click", warning);

///test scripts

var assert = require("assert");
const { isTypedArray } = require("util/types");

describe('generate', () => {
    it('will test if the output is a random book', () => {
        let num = Math.ceil(Math.random()*13);
        var picked = books[num];
        
        assert.ok(picked);
    })
})
