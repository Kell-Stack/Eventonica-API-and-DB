// ***************************************** CLI prompts ******************************

const inquirer = require('inquirer');
const fetch = require ('node-fetch');
inquirer

inquirer.startQuestion = () => {
    inquirer.prompt({
      type: 'list',
      message: 'WELCOME to EVENTONICA!! What would you like to do?',
      choices: [
        'Search all events',
        'Find an event',
        'Add an event',
        'Update an event',
        'Delete an event',
        'Exit'
      ],
      name:'action',
    }).then((res) => {
      const continueCallback = () => inquirer.startQuestion();
  
      if (res.action === 'Search all events') inquirer.searchEventful(continueCallback);
      if (res.action === 'Find an event') inquirer.findEvent(continueCallback);
    //   if (res.action === 'Add an event') inquirer.addEvent(continueCallback);
    //   if (res.action === 'Update an event') inquirer.editEvent(continueCallback);
    //   if (res.action === 'Delete an event') inquirer.deleteEvent('/events/:id');
      if (res.action === 'Exit') {
        return;
      }
      // console.log(JSON.stringify());
});
    }




inquirer.searchEventful = (continueCallback) => {
    let promise = fetch('http://localhost:3000/events');
  
    promise.then((res) => {return res.json();})
            .then(json => {console.log(json);
            continueCallback();
            });
}

inquirer.startQuestion();

// inquirer.findEvent = (continueCallback) => {


// inquirer.addEvent = (continueCallback) => {


// inquirer.editEvent = (continueCallback) => {

// }

// inquirer.deleteEvent = (continueCallback) => {

// }

