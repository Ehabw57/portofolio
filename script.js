const workSpace = document.getElementById('workSpace');

let foucsedTerm = null;
const promptMessage = 'zerobors@void ~ $'
const commands = {
  help: 'i can not help you right now!<br>',
  whoami: '<p>I do not know, go ask <b>ChatGPT</b> or somthing.</p>',
  whoru: `
  <p>Hi! I’m <b>Ehab Hegazy</b>, a Fullstack developer who loves 
   Linux, backend dev, and making lovley UI like this terminal portfolio.</p><br>
  <img src="./assets/me.jpg" width="40%"/>
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
</div>

  `

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
  term.classList.add('focused')

  const termBody = document.createElement('div');

  const termInput = document.createElement('div')
  termInput.classList.add('input-container')

  const prompt = document.createElement('p')
  prompt.innerText = promptMessage
  prompt.classList.add('prompt')

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
  const terminal = termBody.parentElement;
  const command = target.value
  termBody.innerHTML += `<pre class='blue'>${promptMessage} <span class="white">${command}</span></pre>`
    
   if(command == 'clear') {
     termBody.innerHTML = ''
     return
   }
  if (command != ''){
    if (!Object.keys(commands).includes(command)){
      termBody.innerHTML += `<pre>Sorry <span class='bold red'>'${command}'</span> command were not found.\n try running 'help' for more information.</pre>`
    }else
      termBody.innerHTML += commands[command]
  }

  terminal.scrollTop = terminal.scrollHeight;
}
