const workSpace = document.getElementById('workSpace');

let foucsedTerm = null;
const promptMessage = 'zerobors@void ~ $'
const promptColor = '#b0c0ff'
const commands = {
  help: 'i can not help you right now!<br>',
  fuck: 'you too<br>',
  whoami: 'I do not <label>know</label>, ask your self<br>'
}

document.body.addEventListener('keydown', (e) => {
  if (e.metaKey && e.key == 'Enter') {
    const term = createTerm()
    foucsedTerm =  term.dataset.id
    workSpace.appendChild(term)
    console.log('term created')
  }
});

function createTerm() {
  const term = document.createElement('div');
  term.dataset.id = 1; //change it alter
  term.classList.add('terminal')

  const termBody = document.createElement('div');

  const termInput = document.createElement('div')
  termInput.classList.add('input-container')

  const prompt = document.createElement('p')
  prompt.innerText = promptMessage
  prompt.style.color = promptColor

  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.onkeydown = function (e) {
    if (e.key  == "Enter") {
      excuteCommand(e.target)
      e.target.value = ''
    }
  }
  termInput.append(prompt, input) 
  term.appendChild(termBody)
  term.appendChild(termInput)
  return term
}

function excuteCommand(target) {
  const termBody = target.parentElement.previousSibling
  termBody.innerHTML += `${promptMessage}  ${target.value}<br>`

  if (!Object.keys(commands).includes(target.value)){
    termBody.innerHTML += `Sorry no '${target.value}' command were found.<br> try running 'help' for more information.<br>`
    return
  }
  termBody.innerHTML += commands[target.value]
}
