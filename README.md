# 213ODG-NODE

# Pré-requis

Node v14.15.0

# Project Setup

1. `npm i --save express googleapis`
1. create src folder and server.ts file inside it
1. `npm install -g --save typescript`
1. `tsc --init`
1. Modifier le tsconfig.json

```
{
	"compilerOptions": {
		/* Visit https://aka.ms/tsconfig.json to read more about this file */

		/* Basic Options */
		"watch": true,
		// "incremental": true,                   /* Enable incremental compilation */
		"target": "ESNext" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
		"module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
		"lib": [
			"DOM",
			"ES6"
		] /* Specify library files to be included in the compilation. */,
		// "allowJs": true,                       /* Allow javascript files to be compiled. */
		// "checkJs": true,                       /* Report errors in .js files. */
		// "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
		// "declaration": true,                   /* Generates corresponding '.d.ts' file. */
		// "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
		"sourceMap": true /* Generates corresponding '.map' file. */,
		// "outFile": "./",                       /* Concatenate and emit output to single file. */
		"outDir": "./build" /* Redirect output structure to the directory. */,
		// "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
		// "composite": true,                     /* Enable project compilation */
		// "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
		// "removeComments": true,                /* Do not emit comments to output. */
		// "noEmit": true,                        /* Do not emit outputs. */
		// "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
		// "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
		// "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

		/* Strict Type-Checking Options */
		"strict": true /* Enable all strict type-checking options. */,
		"noImplicitAny": true /* Raise error on expressions and declarations with an implied 'any' type. */,
		// "strictNullChecks": true,              /* Enable strict null checks. */
		// "strictFunctionTypes": true,           /* Enable strict checking of function types. */
		// "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
		// "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
		// "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
		// "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

		/* Additional Checks */
		// "noUnusedLocals": true,                /* Report errors on unused locals. */
		// "noUnusedParameters": true,            /* Report errors on unused parameters. */
		// "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
		// "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

		/* Module Resolution Options */
		// "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
		"baseUrl": "./src" /* Base directory to resolve non-absolute module names. */,
		// "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
		// "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
		// "typeRoots": [],                       /* List of folders to include type definitions from. */
		// "types": [],                           /* Type declaration files to be included in compilation. */
		// "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
		"esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
		// "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
		// "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

		/* Source Map Options */
		// "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
		// "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
		// "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
		// "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

		/* Experimental Options */
		// "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
		// "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

		/* Advanced Options */
		"skipLibCheck": true /* Skip type checking of declaration files. */,
		"forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
	},
	"exclude": ["node_modules", "dist"],
	"include": ["src/**/*.ts"]
}
}
```

1. `npm i nodemon`
1. `npm i --save @types/express`
1. `npm i @types/node ts-node @types/dotenv dotenv`
1. `npm i -g --save eslint`
1. `eslint --init`

```
❯ eslint --init
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · node
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
√ What format do you want your config file to be in? · JSON
```

# Configure Files

1. add script to package.json (see issue below) `"start": "nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec \"ts-node\" src/server.ts"`

# Configure Database

1. `npm i mongoose @types/mongoose`

# Known issues

1. For Windows users, we cannot use simple quotes to execute ts-node command. Using double quotes with backslash instead.
