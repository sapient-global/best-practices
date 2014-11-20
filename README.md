# SapientNitro Best Practices

[![Dependency Status](https://david-dm.org/sapient-global/best-practices.png)](https://david-dm.org/sapientnitrolondon/best-practices/)

Sapient Nitro Global Best Practices Repository

This document is an overview of Front End development standards that we adhere to at Sapient. These best practices are collected from the experiences we've had with numerous, large-scale projects, as well as a variety of web resources. These standards will help reduce friction in your workflows by providing a common starting point and will serve as a useful intro for both new hires and contractors.

If you ever had to merge 103 files with somebody's tabs-to-spaces changes, you'll know what we mean.

We're happy to share this with the community and are excited to hear back form you - send us your comments and suggestions please create a fork and submit a pull request to start the conversation.

This document is hosted here http://sapient-global.github.io/best-practices/.

# Running Local Version + Adding to document

In order to run and build the document, you need to have installed [Grunt](http://www.gruntjs.com).

To work on the document, run `grunt dev`, this will build up the doc, start a local server, start a livereload server and open you browser. In order to use the livereload functionality, you can use a browser plugin such as [this one](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) for Chrome.

The main file is split into Handlebars partials and uses the Markdown format (not everything has been converted yet!).

When you are ready to build and push the compiled pages to the gh-pages branch, use the command `grunt build`.