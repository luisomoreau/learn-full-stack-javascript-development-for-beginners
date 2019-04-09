[This tutorial is still being written]

# Learn Full-Stack Javascript Development with Loopback and Angular 6 for beginners.

Hello everyone, my name is Louis Moreau, I'm a Full Stack Engineer at [Goodeed](https://www.goodeed.com).
In this tutorial, I'll try to teach you how to create a backend with a public API using Loopback 3 (NodeJS Framework) and a frontend using Angular 6.
As an example, we will work on a project to manage and display cooking recipes.
First, we will develop a backend with a public API to create, read, update and delete the recipes.
Then, we will use Angular 6 to develop a simple website that can display the cooking recipes.
You can checkout out this project's [Github repository](https://github.com/luisomoreau/learn-full-stack-javascript-development-for-beginners)


Here are the steps we will follow:

Backend:

* How to install the needed tools.

* How to create your models.

* How to link the models between each other.

* How to use the loopback filters.

* How to deploy you project on [Heroku](https://www.heroku.com/) (or [Dokku](http://dokku.viewdocs.io/dokku/) or [Flynn](https://flynn.io/)).

* How to secure access to your API.

* How to add an authentication layer (using [PassportJS](http://www.passportjs.org/)).

Frontend:

* How to install the needed tools.

* How to create an Angular project.

* How to generate the services using the Loopback SDK Builder tool.


## Backend and public API


### Prerequisites

No prerequisites are needed for this tutorial, you just need to follow the steps. Do not hesitate to comment or to ask a question on Github if you feel lost, I'd be happy to answer as soon as possible.

### Needed Tools

For this tutorial you will need to install an IDE (Integrated Development Environment), I'm using [Webstorm](https://www.jetbrains.com/webstorm/) or [Atom](https://atom.io/) but feel free to use any other you feel comfortable with.
WebStorm comes with a 30-days free trial.
Hint: If you are a student, you can get a licence for free:
[Check it out here](https://www.jetbrains.com/student/).
Atom.io is free and open source.

#### Install Git

Here is the link to install git depending on your Operating System: [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

#### Install NodeJS

At the time I'm writing the tutorial, the LTS (Long Term Support) version of NodeJS is 10.15:

![NodeJS Version](assets/node-latest-version.png)

To install nodeJS, we will use nvm (Node Version Manager). NVM will give us the possibility to switch node version depending on our needs.

* Install nvm on Windows:
[https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows).

* Install nvm on macOS or Linux: [https://github.com/creationix/nvm](https://github.com/creationix/nvm).
Basically, you just need to run the following command:
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
Don't forget to close your terminal and reopen it or use source to reload it:
```
$> source ~/.bash_profile
```

Then, run:

```
$> nvm install 10.15
$> nvm use 10.15
```


#### Install MongoDB

In this tutorial, we will use MongoDB 3.6 Community Edition.

* Install on Linux:
Install MongoDB Community Edition and required dependencies on Linux:
[https://docs.mongodb.com/v3.6/administration/install-on-linux/](https://docs.mongodb.com/v3.6/administration/install-on-linux/).

* Install on macOS:
Install MongoDB Community Edition on macOS systems from Homebrew packages or from MongoDB archives.
The easiest is it you Homebrew:
```
$> brew update
$> brew install mongodb
```

* Install on Windows:
Install MongoDB Community Edition on Windows systems and optionally start MongoDB as a Windows service:
[https://docs.mongodb.com/v3.6/tutorial/install-mongodb-on-windows/](https://docs.mongodb.com/v3.6/tutorial/install-mongodb-on-windows/).

### Loopback
#### Install Loopback

Install Loopback globally (the -g option will install the npm - Node Packet Manager - globally, it means, the loopback command  "lb" will be accessible anywhere in your system).

```
npm install -g loopback-cli
```

Start a new project

```
lb
```

Follow the prompt:
```
Louiss-MacBook-Pro:sources louis$ lb
? What's the name of your application? backend
? Enter name of the directory to contain the project: backend

   create backend/
     info change the working directory to backend

? Which version of LoopBack would you like to use? 3.x (Active Long Term Support)
? What kind of application do you have in mind? (Use arrow keys)
❯ api-server (A LoopBack API server with local User auth)
  empty-server (An empty LoopBack API, without any configured models or datasources)
  hello-world (A project containing a controller, including a single vanilla Message and a single remote method)
  notes (A project containing a basic working example, including a memory database)

```

Move into the created directory:
```
$> cd backend
```

Install dependencies:
```
npm install
```

Start the project:
```
npm start
```

At this stage, you should be able to access the Loopback Explorer to see the generated routes for your API:

![Loopback Explorer](assets/lb-explorer-after-creation.png)

Note that because you chose to create an "api-server" project, loopback created for you an API including a User model and an authentication method.

#### Typescript

Just before seeing the database and the models, I'll pause this tutorial for the ones interested in using Loopback with Typescript.
I won't be able to explain all the benefits of Typescript in this tutorial but I'll just quote [Paul Dixon](https://stackoverflow.com/users/6521/paul-dixon)'s answer on Stack Overflow:

> [TypeScript](http://www.typescriptlang.org/) is a superset of JavaScript which primarily provides optional static typing, classes and interfaces. One of the big benefits is to enable IDEs to provide a richer environment for spotting common errors as you type the code.

> To get an idea of what I mean, watch [Microsoft's introductory video](http://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript) on the language.

> For a large JavaScript project, adopting TypeScript might result in more robust software, while still being deployable where a regular JavaScript application would run.

> It is open source, but you only get the clever Intellisense as you type if you use a supported IDE. Initially, this was only Microsoft's Visual Studio (also noted in blog post from [Miguel de Icaza](http://tirania.org/blog/archive/2012/Oct-01.html)). These days, [other IDEs offer TypeScript support too](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

> Are there other technologies like it?
There's [CoffeeScript](http://coffeescript.org/), but that really serves a different purpose. IMHO, CoffeeScript provides readability for humans, but TypeScript also provides deep readability for tools through its optional static typing (see [this recent blog post](http://www.hanselman.com/blog/WhyDoesTypeScriptHaveToBeTheAnswerToAnything.aspx) for a little more critique). There's also [Dart](http://en.wikipedia.org/wiki/Dart_%28programming_language%29) but that's a full on replacement for JavaScript (though it [can produce JavaScript code](http://www.dartlang.org/docs/dart-up-and-running/contents/ch04-tools-dart2js.html)).

> Example
As an example, here's some TypeScript (you can play with this in the [TypeScript Playground](http://www.typescriptlang.org/Playground/))
> ```
class Greeter {
    greeting: string;
    constructor (message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```
And here's the JavaScript it would produce
> ```
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
```

> Notice how the TypeScript defines the type of member variables and class method parameters. This is removed when translating to JavaScript, but used by the IDE and compiler to spot errors, like passing a numeric type to the constructor.

> It's also capable of inferring types which aren't explicitly declared, for example, it would determine the greet() method returns a string.

> Debugging Typescript
Many browsers and IDEs offer direct debugging support through sourcemaps. See this Stack Overflow question for more details: [Debugging TypeScript code with Visual Studio](https://stackoverflow.com/questions/12711826/debugging-typescript-code-with-visual-studio).

Source: [https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript](https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript)

In short, using TypeScript avoid making many mistakes while writting your code, you can code faster and have a better understanding of the code produced by you and others.

I wrote few month ago a [Loopback TypeScript Boilerplate](https://github.com/luisomoreau/loopback3-typescript-boilerplate). If you want to use it, it is a Loopback application with a User model (like the application we've just created) but it has TypeScript already configured.

Otherwise, I will show you have to configure TypeScript with our new application. Just follow the next steps:

* Install @types/node using npm:
```
?> npm install --save @types/node
?> npm install --save @mean-expert/boot-script
?> npm install --save @mean-expert/model
?> npm install --save ts-node
?> npm install --save typescript
```
or just replace your package.json file by this one:
```
{
  "name": "recipes",
  "author": "Louis Moreau",
  "version": "1.0.0",
  "main": "server/server.js",
  "engines": {
    "node": ">=8.12.0",
    "npm": ">=6.4.1"
  },
  "scripts": {
    "lint": "eslint .",
    "start": "node .",
    "posttest": "npm run lint",
    "compile": "tsc && copyfiles \"server/**/*.json\" build/server -u 1"
  },
  "dependencies": {
    "@mean-expert/boot-script": "^1.0.0",
    "@mean-expert/model": "^1.0.9",
    "@types/node": "^11.13.2",
    "compression": "^1.0.3",
    "cors": "^2.5.2",
    "helmet": "^3.10.0",
    "loopback": "^3.22.0",
    "loopback-boot": "^2.6.5",
    "loopback-component-explorer": "^6.2.0",
    "loopback-connector-mongodb": "^3.9.2",
    "serve-favicon": "^2.0.1",
    "strong-error-handler": "^3.0.0",
    "ts-node": "^7.0.1",
    "typescript": "^3.1.4"
  },
  "devDependencies": {
    "eslint": "^3.17.1",
    "eslint-config-loopback": "^8.0.0"
  },
  "repository": {
    "type": "",
    "url": ""
  },
  "license": "UNLICENSED",
  "description": "recipes"
}
```
If you copied the package.json, remove you node_modules/ folder and run ```npm install```


* Add the following file at the backend root:
backend/tsconfig.json:
```
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "typeRoots": [
      "./node_modules/@types"
    ],
    "types": [
      "node"
    ]
  }
}
```

* Finally, edit your server.js and add the following line under 'use strict':
```
require('ts-node/register');
```

All set, we are ready to continue the tutorial.
In this Typescript part, I do not expect you to understand everything we did, it is a more advanced level.

#### Database: Loopback MongoDB connector:

Before creating a model, we will add the loopback-connector-mongodb npm package to attach our future model to a mongo database:
Go in your application root repository and run:
```
npm install loopback-connector-mongodb --save
```
The --save parameter will save in the package.json file the instruction to install this package when you will need to install all the dependencies using npm install.

Now that the package is installed, we will need to configure the mongo datasource (server/datasources.json):
Go to your server repository and add the mongodb datasource as below:

```
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mongo": {
    "host": "localhost",
    "port": 27017,
    "url": "",
    "database": "recipesdb",
    "password": "",
    "name": "mongo",
    "user": "",
    "authSource": "",
    "connector": "mongodb"
  }
}
```

### Generate a model:

```
lb model <ModelName>
```

Follow the instructions:

```
? Enter the model name: (ModelName) MyModel
? Select the datasource to attach MyModel to: (Use arrow keys)
❯ db (memory)
  mongo (mongodb)
  (no datasource)
? Select model's base class (Use arrow keys)
  Model
❯ PersistedModel
  ACL
  AccessToken
  Application
  Change
  Checkpoint
(Move up and down to reveal more choices)
? Expose MyModel via the REST API? (Y/n) Y
? Custom plural form (used to build REST URL): MyModels
? Common model or server only? (Use arrow keys)
❯ common
  server

Enter an empty property name when done.
? Property name: Name
```

Example with the Recipe model:

```
$> lb model Recipe
```
By convention, we name the model starting with a capital letter.

```
? Select the datasource to attach undefined to: mongo (mongodb)
? Select model's base class PersistedModel
? Expose Recipe via the REST API? Yes
? Custom plural form (used to build REST URL): Recipes
? Common model or server only? common
Let's add some Recipe properties now.

Enter an empty property name when done.
? Property name: id
? Property type: string
? Required? No
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: name
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: description
? Property type: string
? Required? No
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: guideLines
? Property type: string
? Required? No
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.

? Property name: preparationTime
? Property type: string
? Required? No
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: cookingTime
? Property type: string
? Required? No
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: tips
? Property type: string
? Required? No
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: image
? Property type: string
? Required? No
? Default value[leave blank for none]:


```

We will try to see in the Loopback Explorer our new Recipe model:

If you come across this error:
```
MongoNetworkError: failed to connect to server [localhost:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:
27017]
```
It means that your mongodb service is not running.
On macOS, you can start the service with:
```
$> brew services mongodb
```

Then run again:
```
$> npm start
```
Open the explorer [http://localhost:3000/explorer](http://localhost:3000/explorer). You should now see your new model API routes:

![Explorer with Recipes](assets/lb-explorer-recipes.png)

To check if it works you can run:
```
$> curl http://localhost:3000/api/Recipes/
// the response should be an empty array: []
```

Now try to POST a cookies recipe:

![POST Cookies 1](assets/lb-explorer-post-cookies-1.png)

```
{"name":"Cookies",
"description":"Homemade cookies",
"guideLines":"Preheat the oven to 200°C. Mix together the two sugars. Mix the softened butter into the sugar in globs. Mix in the eggs one at a time. Measure and mix in the vanilla, salt, and baking soda. Add
the flour all at once.",
"preparationTime":"30 minutes",
"cookingTime":"30 minutes",
"tips":"You can add vanilla to give a better taste",
"image":"https://raw.githubusercontent.com/luisomoreau/learn-full-stack-javascript-development-for-beginners/master/assets/cookies-sweets-food-dessert-delicious-snack-sugar.jpg"}
```

![POST Cookies 1](assets/lb-explorer-post-cookies-2.png)

Run again:
```
$> curl http://localhost:3000/api/Recipes/
// the response should be an array: [{"id":"5c409091fa17f2c9f80d0604","name":"Cookies","description":"Homemade cookies","guideLines":"Preheat the oven to 200°C. Mix together the two sugars. Mix the softened butter into the sugar in globs. Mix in the eggs one at a time. Measure and mix in the vanilla, salt, and baking soda. Add
the flour all at once.","preparationTime":"30 minutes","cookingTime":"30 minutes","tips":"You can add vanilla to give a better taste","image":"https://raw.githubusercontent.com/luisomoreau/learn-full-stack-javascript-development-for-beginners/master/assets/cookies-sweets-food-dessert-delicious-snack-sugar.jpg"}]
```

Here we go! We have our first model working!
However, we still need to add our ingredients, change few things in our Recipe model, etc...

Let's open our Recipe model in common/models/recipe.json and see how it looks.

```
{
  "name": "Recipe",
  "plural": "Recipes",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "string"
    },
    "guideLines": {
      "type": "string"
    },
    "preparationTime": {
      "type": "string"
    },
    "cookingTime": {
      "type": "string"
    },
    "tips": {
      "type": "string"
    },
    "image": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

I'm not very happy with the guideLines property. I think it would be better to have an array of strings so let's change it:

Replace:
```
"guideLines": {
  "type": "string"
},
```
By:
```
"guideLines": ["string"],
```

Don't worry about the relations and acls fields by now, we will have a look at it after.

As you see, we can change anything within the code so don't worry if you need to add more properties or if you want to change their types. However, be careful when you change the model's properties. It may break your application...
In our case, we need to delete our cookies recipe because the "string" type is incompatible with ["string"].
If you want to add the cookies recipes with and array of guideLines, you can use this recipe:
```
{"name":"Cookies",
"description":"Homemade cookies",
"guideLines":[
"Preheat the oven to 200°C.",
"Mix together the two sugars.",
"Mix the softened butter into the sugar in globs.",
"Mix in the eggs one at a time.",
"Measure and mix in the vanilla, salt, and baking soda.", "Add the flour all at once."],
"preparationTime":"30 minutes",
"cookingTime":"30 minutes",
"tips":"You can add vanilla to give a better taste",
"image":"https://raw.githubusercontent.com/luisomoreau/learn-full-stack-javascript-development-for-beginners/master/assets/cookies-sweets-food-dessert-delicious-snack-sugar.jpg"}
```

Just before adding the ingredient model, let's have a look at the server/model-config.json file:

```
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../common/mixins",
      "./mixins"
    ]
  },
  "User": {
    "dataSource": "db"
  },
  "AccessToken": {
    "dataSource": "db",
    "public": false
  },
  "ACL": {
    "dataSource": "db",
    "public": false
  },
  "RoleMapping": {
    "dataSource": "db",
    "public": false,
    "options": {
      "strictObjectIDCoercion": true
    }
  },
  "Role": {
    "dataSource": "db",
    "public": false
  },
  "Recipe": {
    "dataSource": "mongo",
    "public": true
  }
}
```

If you want to add manually another model or change its connector, you can do it in this file.
For example, I want the User and AccessToken models to use mongodb instead of the memory connector. Let's change this:

```
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../common/mixins",
      "./mixins"
    ]
  },
  "User": {
    "dataSource": "mongo"
  },
  "AccessToken": {
    "dataSource": "mongo",
    "public": false
  },
  "ACL": {
    "dataSource": "db",
    "public": false
  },
  "RoleMapping": {
    "dataSource": "db",
    "public": false,
    "options": {
      "strictObjectIDCoercion": true
    }
  },
  "Role": {
    "dataSource": "db",
    "public": false
  },
  "Recipe": {
    "dataSource": "mongo",
    "public": true
  }
}
```

#### Relations

Now we want to add a relation between ingredients and a recipe. First, we will create our ingredient model:

```
$> lb model Ingredient
```

```
? Select the datasource to attach undefined to: mongo (mongodb)
? Select model's base class PersistedModel
? Expose Recipe via the REST API? Yes
? Custom plural form (used to build REST URL): Ingredients
? Common model or server only? common
Let's add some Recipe properties now.

Enter an empty property name when done.
? Property name: id
? Property type: string
? Required? No
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: name
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: quantity
? Property type: number
? Required? Yes
? Default value[leave blank for none]:

Let's add another Recipe property.
Enter an empty property name when done.
? Property name: units
? Property type: string
? Required? No
? Default value[leave blank for none]:
```

Ok, now we have both our Recipe and Ingredient models. We need to link them.

An ingredient will belong to a recipe:

```
$> lb relation
```

```
? Select the model to create the relationship from: Ingredient
? Relation type: belongs to
? Choose a model to create a relationship with: Recipe
? Enter the property name for the relation: recipe
? Optionally enter a custom foreign key:
? Allow the relation to be nested in REST APIs: No
? Disable the relation from being included: No
```
Some options are available, just follow the prompt right now.

A recipe will have many ingredients:

```
$> lb relation
```

```
? Select the model to create the relationship from: Recipe
? Relation type: has many
? Choose a model to create a relationship with: Ingredient
? Enter the property name for the relation: ingredients
? Optionally enter a custom foreign key:
? Require a through model? No
? Allow the relation to be nested in REST APIs: No
? Disable the relation from being included: No
```

Now open back our Recipe and Ingredient models:

```
{
  "name": "Ingredient",
  "plural": "Ingredients",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "quantity": {
      "type": "number"
    },
    "unit": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "recipe": {
      "type": "belongsTo",
      "model": "Recipe",
      "foreignKey": ""
    }
  },
  "acls": [],
  "methods": {}
}
```

```
{
  "name": "Recipe",
  "plural": "Recipes",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "string"
    },
    "guideLines": {
      "type": [
        "string"
      ]
    },
    "preparationTime": {
      "type": "string"
    },
    "cookingTime": {
      "type": "string"
    },
    "tips": {
      "type": "string"
    },
    "image": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "ingredients": {
      "type": "hasMany",
      "model": "Ingredient",
      "foreignKey": ""
    }
  },
  "acls": [],
  "methods": {}
}
```

How does it look in the explorer?

![Relation 1](assets/lb-explorer-recipe-with-relation.png)

![Relation 2](assets/lb-explorer-ingredient-with-relation.png)

As you can see, in the Ingredient model, a new property appeared: recipeId, which is the foreign key.

To create a new ingredient linked with the cookie recipe, we need to add the recipe id in the ingredient property. In my case it will be:

```
{
  "name": "Eggs",
  "quantity": 2,
  "unit": "piece",
  "recipeId": "5cac667fbcd943a6690cbf3f"
}
```
![Create Ingredient eggs](assets/lb-explorer-create-ingredient-eggs.png)

Note that in the models (ingredient.json for example), you have an option:
```
"idInjection": true,
```
This option generates an ID, you can set it to false if you want to set manually the IDs but I would not recommend it.

#### Loopback filters

You can find all the needed documentation about Loopback filters here:
[https://loopback.io/doc/en/lb3/Querying-data.html](https://loopback.io/doc/en/lb3/Querying-data.html)

![loopback filters](assets/loopback-filters.png)

Let's see the include filter to get the cookies recipe with the ingredients:

Go back to the explorer to get the recipes and add the following filter:
```
{"include":"ingredients"}
```
![lb explorer filters](assets/lb-explorer-include-filter.png)

You will see in the response that the associated ingredients are included in an array:
```
[
  {
    "id": "5cac667fbcd943a6690cbf3f",
    "name": "Cookies",
    "description": "Homemade cookies",
    "guideLines": [
      "Preheat the oven to 200°C.",
      "Mix together the two sugars.",
      "Mix the softened butter into the sugar in globs.",
      "Mix in the eggs one at a time.",
      "Measure and mix in the vanilla, salt, and baking soda.",
      "Add the flour all at once."
    ],
    "preparationTime": "30 minutes",
    "cookingTime": "30 minutes",
    "tips": "You can add vanilla to give a better taste",
    "image": "https://raw.githubusercontent.com/luisomoreau/learn-full-stack-javascript-development-for-beginners/master/assets/cookies-sweets-food-dessert-delicious-snack-sugar.jpg",
    "ingredients": [
      {
        "id": "5cac70f64df833a79f59ee65",
        "name": "Eggs",
        "quantity": 2,
        "unit": "piece",
        "recipeId": "5cac667fbcd943a6690cbf3f"
      }
    ]
  }
]
```

If you want to test this request using curl:
```
?> curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Recipes?filter=%7B%22include%22%3A%22ingredients%22%7D'
```
We won't enter into details about the other filters but I invite you to take a look at the Loopback documentation.
