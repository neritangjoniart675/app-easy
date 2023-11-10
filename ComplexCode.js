/*
Filename: ComplexCode.js
Content: Complex code that simulates a digital pet game.
*/

// Define the Pet class
class Pet {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.age = 0;
    this.hunger = 0;
    this.happiness = 100;
    this.isSleeping = false;
  }

  eat(food) {
    if (!this.isSleeping) {
      this.hunger -= food;
      this.happiness += food;
    }
  }

  sleep() {
    this.isSleeping = true;
    this.hunger += 10;
  }

  play() {
    if (!this.isSleeping) {
      this.happiness += 20;
    }
  }

  birthday() {
    this.age++;
    this.happiness -= 10;
  }

  getStatus() {
    let status = `${this.name} is a ${this.type}.\n`;
    status += `Age: ${this.age}\n`;
    status += `Hunger: ${this.hunger}\n`;
    status += `Happiness: ${this.happiness}\n`;
    status += `Sleeping: ${this.isSleeping ? 'Yes' : 'No'}\n`;
    return status;
  }
}

// Create a new pet instance
const myPet = new Pet("Max", "Dog");

// Simulate actions over time
for (let i = 0; i < 100; i++) {
  if (i % 10 === 0) {
    myPet.birthday();
  }

  if (i % 5 === 0) {
    myPet.eat(5);
    myPet.sleep();
  }

  myPet.play();
}

// Get the final status
console.log(`Final Status:\n${myPet.getStatus()}`);