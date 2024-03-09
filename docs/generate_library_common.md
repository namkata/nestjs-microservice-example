```bash
nest generate library common
```
After running the command, NestJS will generate a directory named "common" within your project's libs directory. Inside this directory, you'll find various files and folders, including:

- src/: This directory contains the source code for your library.
    - src/common.module.ts: This file contains the definition of your library module. You can declare providers, controllers, and other components specific to your library within this module.
    - src/common.service.ts (optional): This is an example service file provided by NestJS. You can rename it or delete it as needed.
    - src/index.ts: This file exports symbols from your library to make them accessible from other parts of your application.
- README.md: This file contains information about your library and its usage.
- package.json: This file contains metadata and dependencies for your library.

Once your library is generated and customized, you can import and use it in other parts of your NestJS application. Simply import the module from your library into any module where you want to use its components.