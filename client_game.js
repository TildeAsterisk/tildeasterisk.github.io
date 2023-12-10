// Define a simple character class (triangle)
class Character {
	constructor(x, y,colour) {
		this.x = x;
		this.y = y;
		
		this.speed=0.5;
		this.hp = 100;
		this.attack=10;
		this.defence=10;
		this.atkspd=1;

		this.colour="grey";
	}

	// Move the character toward a target point
	moveToward(targetX, targetY, speed) {
		const dx = targetX - this.x;
		const dy = targetY - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance > 0) {
			const ratio = Math.min(speed / distance, 1);
			this.x += dx * ratio;
			this.y += dy * ratio;
		}
	}

	// Check if the character is within attack range
	isInAttackRange(other, attackRange) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		return distance <= attackRange;
	}
}

//Array of active characters
const activeCharacters = [];

// Create two characters
const characterA = new Character(10, 100,"red"); // Initial position
activeCharacters.push(characterA);

const characterB = new Character(350, 100,"blue"); // Initial position
activeCharacters.push(characterB);

const characterC = new Character(10, 120,"red"); // Initial position
activeCharacters.push(characterC);

const characterD = new Character(350, 80,"blue"); // Initial position
activeCharacters.push(characterD);

// Get the canvas element
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Main game loop (simulate movement and attack)
function gameLoop() {
	// For each spawned character that is alive...
    for (const character of activeCharacters) {
		//set target
		const target={x:200,y:50};
		//target=activeCharacters[0];

		// Calculate midpoint to target destination
		const midX = (character.x + target.x) / 2;
		const midY = (character.y + target.y) / 2;

		// Check for attack
		const attackRange = 12; // Define attack range
		if (character.isInAttackRange(target, attackRange)) {
			console.log("Character A attacks Character B!");
			// Perform attack logic here
		}
		//Not in attack range
		else{
			// Move character toward midpoint to target destination
			character.moveToward(midX, midY, character.speed); // Adjust speed as needed
			character.moveToward(midX, midY, character.speed);
		}
    }

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Draw each character
	for (const character of activeCharacters) {
		ctx.fillStyle = character.colour;
		ctx.fillRect(character.x, character.y, 10, 10);
	}

	// Repeat the loop (requestAnimationFrame or setInterval)
	requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();