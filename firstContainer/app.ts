const fruits: string[] = ["apple", "banana", "grape", "kiwi", "pear"]

console.log("Number if items: " + fruits.length);
printList(fruits);

fruits.push("mango");
console.log("Number if items: " + fruits.length);
printList(fruits);

function printList(fruits: string[]): void {
    console.log("---------------");
    fruits.forEach((fruit) => {
        console.log(fruit);
    })
    console.log("---------------");
}