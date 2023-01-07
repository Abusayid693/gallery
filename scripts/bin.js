#! /usr/bin/env node
var shell = require("shelljs");

const colours = {    
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    white: "\x1b[47m",
    rreset: "\x1b[0m"
};

shell.echo(colours.green, 'Compiling........' ,colours.rreset);

shell.exec("npm run start-app:prod");