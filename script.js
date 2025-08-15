const workSpace = document.getElementById('workSpace');

let foucsedTerm = null;
let terminals = 0;
const promptMessage = 'ehab@void ~ $'
const commands = {
  help: 'i can not help you right now!<br>',
  whoami: '<p>I do not know, go ask <b>ChatGPT</b> or somthing.</p>',
  whoru: `
  <p>Hi! I’m <b>Ehab Hegazy</b>, a Fullstack developer who loves 
   Linux, backend dev, and making lovley UI like this terminal portfolio.</p><br>
  <img src="./assets/me.jpg" style="width:30%;"/>
  <p>Yeah this guy is Me :D`,
  skills: `
  <p><p>Languages:</p> C, Python, JavaScript</p>
  <p><p>Frameworks:</p> FastAPI, Bootstrap, Sass</p>
  <p><p>DataBase:</p> MySQL, MongoDB, sqlite</p>
  <p><p>Other:</p> Docker, Nginx, Bash scripting</p>`,
  contacts: `
  <p>Ofcourse i would love you to contact me here are my contacts:</p>
  <br>
  <p>Email: <a href="mailto:maestro.ehab123@gmail.com">Email Me</a></p>
  <p>GitHub: <a href="https://github.com/Ehabw57" target="_blank">github.com/Ehabw57.com</a></p>
  <p>LinkedIn: <a href="https://www.linkedin.com/in/ehababdelrady" target="_blank">linkedin.com/in/EhabHegzy</a></p>
  <p>Phone: <a href='tel:+201551854079'>+20 155 185 4079</a></p>`,
  projects: `
  <div class="cmd-output projects">
  <ul type="none">
    <li>
      <a href="https://github.com/Ehabw57/logger" target="_blank">Logger</a>
      <span> - A commandline based tool coded with C, designed to help you manage employee logs and records efficiently. It supports logging activities, managing employee data, and provides a comprehensive help system.</span>
      <br>
      <br>
    </li>
    <li>
      <a href="https://github.com/Ehabw57/QuranLink" target="_blank">QuranLink</a>
      <span> - A focused Quran memorization web appliction that helps you memorize quran, it uses you muscel memory and word completion quzies to help you memorize better and more efficent.</span>
      <br>
      <br>
    </li>
    <li>
      <a href="https://github.com/ALX-NULL/roundOf11" target="_blank">An AI Learning Assistant</a>
      <span> - An AI powered platform designed to automatically generate and assess quizzes, streamlining the process of creating and evaluating assessments. The platform offers advanced features to enhance both teaching and learning experiences, providing instant feedback and integrating seamlessly with Learning Management Systems (LMS).</span>
    </li>
  </ul>
</div>`
}

document.body.addEventListener('keydown', (e) => {
  if (e.metaKey) {
    if (e.key == 'Enter') {
      if(terminals == 0) {
        const newTerm = createTerm()
        workSpace.appendChild(newTerm)
        focusTerm(newTerm)
      }else
        newTerm();
    } else if (e.key == 'j')
      getClothestTerm('bottom')
    else if (e.key == 'k')
      getClothestTerm('top')
    else if (e.key == 'h')
      getClothestTerm('left')
    else if (e.key == 'l')
      getClothestTerm('right')
  }
});

function focusTerm(term) {
  if(foucsedTerm)
    foucsedTerm.classList.remove('focused')
  term.classList.add('focused')
  term.getElementsByTagName('input')[0].focus()
  foucsedTerm = term
}

function log(){
  console.log(foucsedTerm.getElementsByTagName('div')[0].innerHTML)
}

function newTerm() {
    const term = createTerm()
	const termParent = foucsedTerm.parentElement
	const container = document.createElement('div')
	container.classList.add('term-container')
	container.classList.add(foucsedTerm.offsetWidth < foucsedTerm.offsetHeight ? 'column' : 'row')
  termParent.insertBefore(container, foucsedTerm)
  foucsedTerm.classList.remove('scale')
  container.append(foucsedTerm, term)
  focusTerm(term)
}

function createTerm() {
  const term = document.createElement('div');
  //term.dataset.id = 1; //change it alter
  term.classList.add('terminal')
  term.classList.add('scale')
  term.onclick = function() {
    focusTerm(term)
  }

  const termBody = document.createElement('div');
  termBody.classList.add('term-body')

  const termInput = document.createElement('div')
  termInput.classList.add('input-container')

  const prompt = document.createElement('p')
  prompt.innerText = promptMessage
  prompt.classList.add('prompt')

  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.onkeydown = function (e) {
    if (e.metaKey)
      e.preventDefault()
    if (e.key  == "Enter" && !e.metaKey) {
      excuteCommand(e.target)
      e.target.value = ''
    }
  }
  termInput.append(prompt, input) 
  term.append(termBody, termInput)
	terminals++;
  return term
}

function excuteCommand(target) {
  const termBody = target.parentElement.previousSibling
  const terminal = termBody.parentElement;
  const command = target.value
  termBody.innerHTML += `<pre class='blue'>${promptMessage} <span class="white">${command}</span></pre>`
    
   if(command == 'clear') {
     termBody.innerHTML = ''
     return
   }
  if (command != ''){
    if (!Object.keys(commands).includes(command)){
      termBody.innerHTML += `<p>Sorry <span class='red'>'${command}'</span> command were not found.\n try running 'help' for more information.</p>`
    }else
      termBody.innerHTML += commands[command]
  }

  termBody.scrollTop = termBody.scrollHeight;
}

function getClothestTerm(direction) {
  const {offsetLeft:cx, offsetTop:cy, offsetHeight:ch, offsetWidth:cw} = foucsedTerm
  let distance = 1000;
  let termDistance = 0;
  let closeTerm = null;
  const terms = document.querySelectorAll('.terminal')

  for (const term of terms) {
    if (term === foucsedTerm) 
      continue
    const {offsetLeft:tx, offsetTop:ty, offsetHeight:th, offsetWidth:tw} = term

    if (direction == 'top') {
      if (ty + th < cy)
        termDistance = cy - (ty + th)
      else
        continue
    } else if (direction == 'bottom') {
      if (cy + ch < ty)
        termDistance =  ty - (cy + ch)
      else
        continue
    } else if (direction == 'left') {
      if (cx > tx + tw)
        termDistance = cx - (tx + tw)
      else
        continue
    } else if ( direction == 'right') {
      if (tx > cx + cw)
        termDistance = tx - (cx + cw)
      else
        continue
    }

    if (termDistance < distance) {
      distance = termDistance
      closeTerm = term
    }
  }

  if (closeTerm)
    focusTerm(closeTerm)
  return closeTerm
}
