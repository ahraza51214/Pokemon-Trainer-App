## Contributors
* Ali Hassan Raza (ahraza.devOps@gmail.com)
* Pau Go Si (paugosi@hotmail.com)

# PokemonTrainerApp
A Pokémon Trainer web app using the Angular Framework. The application allows a user to collect Pokémon received from the PokeAPI. Users must enter username 
before being able to collect any Pokémon. Users must also be able to view the Pokémon that have been 
collected in their own trainer page. Try and play around with our app. 

## Component Tree
<img width="1100" alt="Assignment3ComponentTree" src="https://github.com/ahraza51214/Pokemon-Trainer-App/assets/127191401/ce78a327-8b3b-49fd-86d0-d7c290d3c62f">

## Install
To run the code on local machine you will need access to the API (environment.ts file). 
You will also need Node.js: https://nodejs.org/en/download/, Angular CLI: https://angular.io/cli and git: https://git-scm.com/downloads
In your console navigate to the folder where you want the project and run the following commands:
```
git clone https://github.com/ahraza51214/Pokemon-Trainer-App
cd Pokemon-Trainer-App
```
## Set-up
For API access, create "environment.ts" and "environment.prod.ts" files in the src/environments/ folder of the project, add the following lines and paste correct API key and url inside the quotation marks:

environment.development.ts
```
export const environment = {
  apiUrl: "<pokemon api url>",
  pokeApiUrl: "<user api url>",
  apiKey: "<api key>"
};
```
environment.ts
```
export const environment = {
  apiUrl: "<pokemon api url>",
  pokeApiUrl: "<user api url>",
  apiKey: "<api key>"
};
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
