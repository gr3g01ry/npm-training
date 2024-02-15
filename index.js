/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from'qr-image';
import { createWriteStream } from 'node:fs';
import { writeFile } from 'node:fs';
import { appendFile } from 'node:fs';

console.log('ok');
inquirer
  .prompt([
    {
        type: 'url',
        name: 'url',
        message: 'Please write a url to generate a qr code.',
        waitUserInput: true,
        validate(value) {
            const pass = value.match(
                /^https:\/\/(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i,
            );
            if (pass) {
              return true;
            }
      
            return 'Please enter a valid url';
      },
    }
  ])
  .then((answers) => {
    // console.log('test');
    console.log(JSON.stringify(answers)); 
    var qr_svg = qr.image(answers.url);
    qr_svg.pipe(createWriteStream(`${answers.url.slice(12,answers.url.length-3)}.png`));
    // qr_svg.pipe(createWriteStream(`qr_img.png`));
    // console.log(qr_svg);

    // writeFile("URL.txt",  answers.url, (err) => {
    //     if (err) throw err;
    //     console.log("The file has been saved!");
    //   });
    /*Meilleur solution on garde tout les qr_code dans un fichier url.txt*/
    appendFile('url.txt', answers.url+'\n' , (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      }); 


  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log(error.isTtyError)
        // Prompt couldn't be rendered in the current environment
      } else {
        console.log(error)
        // Something else went wrong
      }
  });