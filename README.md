# Pokedex API 🚀

The structure of this project aims to structure the code based on components. Instead of repeating the name of the component in a folder of controllers or domain, each component is composed of its own entity, routes, controller, services, repository, test, among other files.

Each component has its providers file to avoid contact with the other files from the outside. Anyone who requires a file of its component should request it from the *.providers.ts file.

This project follows the DDD architecture and simulates the behavior of microservices.

The dependencies are managed by a container (IoC) to have a low or no coupling.


### In Progress

*0%* ✅✅✅✅✅✅✅🔲 *100%*


### Followed best practices ❤️

1. 🔗 [NodeJS Best Practices](https://github.com/goldbergyoni/nodebestpractices)
2. 🔗 [DDD Architecture](https://en.wikipedia.org/wiki/Domain-driven_design)
3. 🔗 [Inversion of control (IoC)](https://en.wikipedia.org/wiki/Inversion_of_control)

### Contribute

To contribute to this repo you must consider the following:

1. 🔗 Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)
2. Consider the use of dependencies well.
3. Read about Node JS Best Practices.
4. Follow the architecture that takes the project.
5. 🔗 Use [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)

### Main Technologies ⚙️

1. NodeJS >=12.6.0
2. ExpressJS
3. 🔗 [TYPEORM](https://typeorm.io/#/)
4. PostgreSQL
5. 🔗 [Docker](https://www.docker.com/)
6. 🔗 [Jest](https://jestjs.io/)

### Getting Started 📌

1. Clone.
2. Move to --> ``` cd pokedex-api ```
3. Update the file ``` .env ```
4. Run ``` npm i && npm run watch ```
6. Check ``` localhost:2302/api/v1 ```

## NOTE 📢

The first registered user is assigned the ROLE = OWNER, this will have special permissions
in all its pokedex, according to the requirements.

* Update, Delete, Disable, List and view users.
* Update, Delete, Disable, List and view pokedex.
* If the OWNER deletes a user or pokedex, all data related to it is deleted.

### Password validation

User passwords have a small layer of additional validation
to avoid the use of common or highly insecure passwords.

You can see this list of common passwords in

``` src/infrastructure/utils/commonPasswords.txt ```

You can add more passwords or delete from this file.

## End

If he came this far it is because we are ready. ✔️

You can consult the Documentation at this URL:

🌐 [Pokedex Docs](https://documenter.getpostman.com/view/7831505/SVtWvmoc?version=latest)
