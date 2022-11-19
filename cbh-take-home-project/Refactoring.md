# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I've refactored the function so that each case is clearly delineated: 1) the trivial partition key case 2) the partition key case 3) input being a string case and 4) input being a number case. Additionally I've pulled out the function for updating max length into a separate helper function and invoked it from deterministicPartitionKey. I think it's more readable as it's easier to understand each separate case with the input- and the code is passing all the test cases I wrote to verify functionality (for each specified case). Think it's also better to pull out the max length check into a separate helper function.