// Establishing things

let inputContainer = document.querySelector('.inputContainer')
let outputContainer = document.querySelector('.outputContainer')

let gameName = document.querySelector('.gameName');
gameName.focus();
let gameConsole = document.querySelector('.gameConsole');
let releaseDate = document.querySelector('.releaseDate');

let addGameButton = document.querySelector('.addGameButton');

let nameColumn = document.querySelector('.outputName')
let consoleColumn = document.querySelector('.outputConsole')
let releaseColumn = document.querySelector('.outputRelease')

let closeButton = document.querySelector('.closeButton')
let instructions = document.querySelector(".instructions")
instructions.style.display = 'none'

let saveButton = document.querySelector('.saveButton')
let loadButton = document.querySelector('.loadButton')
let clearButton = document.querySelector('.clearButton')

let filterTextbox = document.querySelector('.filterTextbox')
let filterName = document.querySelector('.filterName')
let filterConsole = document.querySelector('.filterConsole')
let filterRelease = document.querySelector('.filterRelease')

let entryCount = 0;
let columnCount = 3;


// Code to toggle instructions' visibility

function toggleInstructions() {
    if (instructions.style.display == 'none') {
        instructions.style.display = 'block'
    } else {
        
        instructions.style.display = 'none'
    }
}
closeButton.addEventListener('click',toggleInstructions)

// Code to CLEAR SCREEN

function clearScreen() {

    let allDivs = document.querySelectorAll('h2')

    for (i of allDivs) {

        let classes = i.classList.toString()
        if (classes.substring(0,5) == 'class') {
            i.remove()
        }
    }    
    clearButton.addEventListener('click',clearScreen)
}

clearButton.addEventListener('click',clearScreen);



// Code to SAVE entries
function saveData() {

    let allDivs = document.querySelectorAll('h2')
    let saveCount = 0;
    window.localStorage.clear();
    for (i of allDivs) {
        let classes = i.classList.toString()
        if (classes.substring(0,5) == 'class') {
            window.localStorage.setItem(`${saveCount}`, i.innerText.toString())
            saveCount += 1
        }
    }
    
}
saveButton.addEventListener('click',saveData)


// Code to FILTER entries
            //NOTE: entryCount is count of all rows 



filterName.addEventListener('click',() => {
    console.log(filterTextbox.value)
})

filterConsole.addEventListener('click',() => {
    console.log(filterTextbox.value)
})

filterRelease.addEventListener('click',() => {
    console.log(filterTextbox.value)
})


// Code to LOAD entries

function loadData() {
    dataArray = []
    for (ii in localStorage) {
        // Puts all relevant keys in array
        if (parseInt(ii) >= 0) {
            dataArray.push(ii)
            dataArray.sort()
        }
    }

    //clear page
    clearScreen()
    
    // Places data on-screen
    let entriesCount = 0
    let classVariable = 0
    
    for (i of dataArray) {

        
        while (entriesCount <= (dataArray.length/3-1)) {
            let newName = document.createElement('h2')
            newName.innerText = localStorage[entriesCount];
            newName.classList.add(`class${classVariable}`)
            newName.style.borderBottom = '2px solid black'
            nameColumn.append(newName)
            
            entriesCount += 1
            classVariable += 1
            
            newName.addEventListener('click',() => {
                editEntry(`${newName.classList}`)
            })
        }
        
        classVariable = 0

    for (i of dataArray) {  

        if (entriesCount >= dataArray.length/3 && entriesCount < dataArray.length-(dataArray.length/3)) {
            let newConsole = document.createElement('h2')
            newConsole.innerText = localStorage[entriesCount];
            newConsole.classList.add(`class${classVariable}`)
            newConsole.style.borderBottom = '2px solid black'
            consoleColumn.append(newConsole)
            
            entriesCount += 1
            classVariable += 1

        newConsole.addEventListener('click',() => {
            editEntry(`${newConsole.classList}`)
        })
    }
        }

        classVariable = 0

    for (i of dataArray) {

        if (entriesCount >= dataArray.length-(dataArray.length/3) && entriesCount < dataArray.length) {
            let newRelease = document.createElement('h2')
            newRelease.innerText = localStorage[entriesCount];
            newRelease.classList.add(`class${classVariable}`)
            newRelease.style.borderBottom = '2px solid black'
            releaseColumn.append(newRelease)

            entriesCount += 1
            classVariable += 1

            newRelease.addEventListener('click',() => {
            editEntry(`${newRelease.classList}`)
        })
    }
        }

    }


    }
        

    //    newRelease.addEventListener('click',() => {
    //        editEntry(`${newName.classList}`)
    //    })
        entryCount += 1;


loadButton.addEventListener('click',loadData)

// Code to EDIT or DELETE entry

    function editEntry(entryNumber) {

    let allDivs = document.querySelectorAll(`.${entryNumber}`)
    gameName.value = allDivs[0].innerText
    gameConsole.value = allDivs[1].innerText
    releaseDate.value = allDivs[2].innerText
    for (i of allDivs) {
        
        i.remove()
    }
}

// 'Add' button code

addGameButton.addEventListener('click',() => {

    let year = new Date().getFullYear();
    
    if (gameName.value != '' && gameConsole.value != '' && releaseDate.value > 1900 && releaseDate.value <= year && releaseDate.value != '') {

    let newName = document.createElement('h2')
    newName.innerText = gameName.value;
    newName.classList.add(`class${entryCount}`)
    newName.style.borderBottom = '2px solid black'
    nameColumn.append(newName)
    
    let newConsole = document.createElement('h2')
    newConsole.innerText = gameConsole.value;
    newConsole.classList.add(`class${entryCount}`)
    newConsole.style.borderBottom = '2px solid black'
    consoleColumn.append(newConsole)
    
    let newRelease = document.createElement('h2')
    newRelease.innerText = releaseDate.value;
    newRelease.classList.add(`class${entryCount}`)
    newRelease.style.borderBottom = '2px solid black'
    releaseColumn.append(newRelease)
    
    newName.addEventListener('click',() => {
        editEntry(`${newName.classList}`)
    })

    newConsole.addEventListener('click',() => {
        editEntry(`${newName.classList}`)
    })

    newRelease.addEventListener('click',() => {
        editEntry(`${newName.classList}`)
    })

    entryCount += 1;
    gameName.value = ''
    gameConsole.value = ''
    releaseDate.value = ''
    
    gameName.focus()

    } else {
        alert('Please enter a valid name, console, and release date')
    }
})

