# Utility functions

Functions are utility functions used throughout the applications.
Usually this functions will be imported by selectors. For more information,
see the related documentation (coming soon).

To use a function, import it first. All functions follow the same pattern,
so you only need to know the function name and its context.

```js
// All functions have a named export with the name of the function.
// All functions are also exported in the `index.js` file which
// is present in the context directory, so importing from the
// directory itself is enough.
import { functionName } from 'app/functions/context';
```

When creating a new function, place it in the most appropriate context. If no
context applied, then "general" is a good choice. Contexts are usually shared with
other parts of the application like actions, selectors, etc. So if actions
regarding "location" exist, it makes sense that there are functions here under
the "location" context.

Never use default exports in any function. One file means one function. The file
might also contain other functions that are used for the exported one. In that
case, those other functions should not be exported. If it makes sense that they 
should, that means they deserve to be in their own file.

When functions are created, add the correct export in the file "index.js" of the 
same context. When a new context is created, also export all the functions in 
that context by adding the correct export in the file "index.js" of the "common"
directory. This will make refactoring and code intelligence much more pleasant.

Every function should have their own documentation block right above them. Refer to
the [JSDoc documentation][jsdoc] for information about adding tags and descriptions.

[jsdoc]: http://usejsdoc.org/
