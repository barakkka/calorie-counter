const budget = document.getElementById('budget');
const fields = Array.from(document.querySelectorAll('#calorieCounter .fieldset'));
const addEntryButton = document.getElementById('addEntryButton');
const option = document.getElementById('entry');
const calculateCalories = document.getElementById('calculateButton');
const outputInfo = document.getElementById('outputInfo');
const clearButton = document.getElementById('clearButton');
let globalCount = 0;

addEntryButton.addEventListener('click', addEntry);
calculateCalories.addEventListener('click', calculate);
clearButton.addEventListener('click', clear);

function addEntry(){
    globalCount++;
    const selected = option.value;
    let targetId = document.getElementById(selected);
    const HTMLString = `<label for="name${globalCount}">${globalCount}. Name: </label>
    <input id="name${globalCount}" type="text" placeholder="Name"></input>
    <label for="calorie${globalCount}">Calories: </label>
    <input id="calorie${globalCount}" class="caloriesClass" type="number" placeholder="Calories"></input><br>`;

    targetId.insertAdjacentHTML("beforeend", HTMLString); 
}

function calculate(event){
    event.preventDefault();
    let breakfastCalories = 0;
    let lunchCalories = 0;
    let dinnerCalories = 0;
    let snacksCalories = 0;
    let exerciseCalories = 0;

    const budgetValue = budget.value;

    let breakfastEntries = Array.from(document.querySelectorAll('#breakfast .caloriesClass'));
    let lunchEntries = Array.from(document.querySelectorAll('#lunch .caloriesClass'));
    let dinnerEntries = Array.from(document.querySelectorAll('#dinner .caloriesClass'));
    let snacksEntries = Array.from(document.querySelectorAll('#snacks .caloriesClass'));
    let exerciseEntries = Array.from(document.querySelectorAll('#exercise .caloriesClass'));

    for(let i = 0; i < breakfastEntries.length; i++){
        breakfastCalories += Number(breakfastEntries[i].value);
    }
    for(let i = 0; i < lunchEntries.length; i++){
        lunchCalories += Number(lunchEntries[i].value);
    }
    for(let i = 0; i < dinnerEntries.length; i++){
        dinnerCalories += Number(dinnerEntries[i].value);
    }
    for(let i = 0; i < snacksEntries.length; i++){
        snacksCalories += Number(snacksEntries[i].value);
    }
    for(let i = 0; i < exerciseEntries.length; i++){
        exerciseCalories += Number(exerciseEntries[i].value);
    }

    let consumed = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    let burned = exerciseCalories;

    let RemainingCalories = (budgetValue - consumed) + burned;
    console.log(RemainingCalories);

    results(RemainingCalories, consumed, burned);
}

function results(remainingCalories, consumed, burned){
    outputInfo.innerHTML = '';
    for(let i = 0; i < fields.length; i++){
        fields[i].classList.remove('green');
        fields[i].classList.remove('orange');
        fields[i].classList .remove('red');
    }
    let topText;
    let description;
    if(remainingCalories > 0){
        for(let i = 0; i < fields.length; i++){
            fields[i].classList.add('red');
            
        }
        topText = `<h2 class="deficit">You need ${remainingCalories} more calories to reach your goal<h2><hr>`;
    }
    else if(remainingCalories < 0){
        for(let i = 0; i < fields.length; i++){
            fields[i].classList.add('orange');
        }
        topText = `<h2 class="surplus">you passed your limit with ${Math.abs(remainingCalories)} Calories</h2><hr>`;
    }
    else{
        for(let i = 0; i < fields.length; i++){
            fields[i].classList.add('green');
        }
        topText = `<h2 class="congratulations">Congratulations. You achieved your exact target. Remaining Calories: ${remainingCalories}</h2><hr>`
    }
    outputInfo.insertAdjacentHTML('beforeend', topText);
    description = `<p>Calories Budgeted: <span>${budget.value}</span></p><br>
    <p>Calories Consumed: <span>${consumed}</span></p><br>
    <p>Calories Burned: <span>${burned}</span></p>`

    outputInfo.insertAdjacentHTML('beforeend', description);
    console.log("Baraka is the goat");
}

function clear(){
    location.reload();
}