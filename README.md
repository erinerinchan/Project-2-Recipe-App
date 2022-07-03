# *Hungry Beast*

## Description

This recipe app is a backend project allowing users to access and search recipes from different continents as well as submit their own recipes.

![alt text](public/img/Screenshot.png)
### Main features

- Showing categories of recipes sorted by continents
- Showing latest recipes
- Showing continental recipes
- Showing each recipe with description, instruction and ingredients
- Allowing users to search for recipes containing specific ingredients
- Allowing users to submit one recipe at a time in a form, where they have to fill in their email address, the recipe’s name, description, instructions, ingredients, category sorted by continents and upload the recipe’s image
- Allowing users to submit enquiries in a form, where they have to fill in their name, email address and message

## Resources for creating the project

### Languages

- CSS
- JavaScript
- EJS

### Frameworks

- Bootstrap (CSS)
- Express.js (JavaScript)
- jQuery (JavaScript)

### Runtime environment

- Node.js (JavaScript)
### Database program

- MongoDB

### ODM library

- Mongoose

### Dependencies

- [aws-sdk](https://www.npmjs.com/package/aws-sdk)
- [axios](https://www.npmjs.com/package/axios)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [connect-flash](https://www.npmjs.com/package/connect-flash)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cookie-session](https://www.npmjs.com/package/cookie-session)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ejs](https://www.npmjs.com/package/ejs)
- [express](https://www.npmjs.com/package/express)
- [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts)
- [formidable](https://www.npmjs.com/package/formidable)
- fs
- [jquery](https://www.npmjs.com/package/jquery)
- [jsdom](https://www.npmjs.com/package/jsdom)
- [lodash](https://www.npmjs.com/package/lodash)
- [mongodb](https://www.npmjs.com/package/mongodb?utm_medium=devmedia-synd&utm_source=devmedia&utm_content=serverless&jmp=devmedia-ref)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [morgan](https://www.npmjs.com/package/morgan)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [nodemon](https://www.npmjs.com/package/nodemon)

### Database

- [MyCookbook.io](https://rapidapi.com/mycookbook/api/mycookbook-io1) (Where the project's recipes are fetched from)

### References

- [Wireframing](https://www.figma.com/file/OiIt1zovdm9uL7CnTORsCF/Project-2-Wireframing?node-id=0%3A1)

- [API routes](https://docs.google.com/spreadsheets/d/1i1E82H9rPMkHY67rk9PUZV7OFFbpw13j3U0Z9-R-0Hk/edit#gid=0)
## Link to the project
https://floating-gorge-73473.herokuapp.com/

## Installation

*In your computer’s or code editor’s terminal*:

- Run `git clone git@github.com:erinerinchan/Project-2-Recipe-App.git` for SSH key
- Run `cd Project-2-Recipe-App`
- Run `code .` to open the `Project-2-Recipe-App` folder up in a new window

*In the new window’s terminal:*

- Run `npm install`

*In the `Project-2-Recipe-App` folder*

- Create an `.env` file, and add the following to the file:

```
MONGODB_URI=[The connection string in your MongoDB account]
S3_ACCESS_KEY=[The access key ID in your Amazon Web Service account]
S3_SECRET_KEY=[The secret access key in your Amazon Web Service account]
S3_REGION=[The location of your bucket in your Amazon Web Service account]
S3_BUCKET=[The name of your bucket in your Amazon Web Service account]

```
*For the connection string in your MongoDB account, click [here]()*:

*For the access key ID, secret access key, location of your bucket and the name of your bucket in your Amazon Web Service account, click [here]()*:
