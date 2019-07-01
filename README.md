# PerfexCRM-Module-Boilerplate
A Module Boilerplate for PerfexCRM

## References

[Introduction to Modules](https://help.perfexcrm.com/introduction-to-perfex-crm-modules/)

[Module Security](https://help.perfexcrm.com/module-security/)

[Basics of Modules](https://help.perfexcrm.com/module-basics/)

## Need to know

All modules should be added in the modules folder in your root directory where Perfex CRM is installed and each module must have unique folder name and init file with the same name as your module folder name.

It’s very important to make sure that your module folder name and the .php file name are the same, otherwise, your module won’t be shown in the modules list. 

This boilerplate uses composer for dependency management and npm with 

## Getting Started 

You can create a new module with this repo by running the following commands: 

```bash
# these are system wide and only required as a one off
npm i -g node-sass
npm i -g sassdoc
npm i -g grunt-cli
npm i -g bower

git clone https://github.com/LunarDevelopment/PerfexCRM-Module-Boilerplate.git MYMODULENAME 

cd MYMODULENAME 
mv ./PerfexCRM-Module-Boilerplate.php ./MYMODULENAME.php 
mv ./language/english/MYMODULE_lang.php ./language/english/REPLACETHISBIT_lang.php 

npm install 
bower install
composer install 

# Not needed but handy to know what bower is installing for you: 
# bower install --save-dev jQuery
# bower install --save-dev normalize-css
# bower install --save-dev font-awesome

# Remember to update the doc block in ./MYMODULENAME.php  with the name of your module and a description

```

## Developing 

"Frontend", so to speak, is handled by grunt tasks - do not edit any files in dist/ but in stead work on your js, scss and place images in the assets/ path which will then be compiled with the below commands, either individually or as a group. It's handy to use the watch command while 

Executes the Sass -> CSS task:

`grunt css`

Executes the JS task:

`grunt js`

Executes the Image task:

`grunt image`

Executes Sass/CSS, JS and Images at once:

`grunt build`

File Watcher
A File watcher will run the specified task/s when a file has been changed, you could simply start one with

`grunt watch css`

if you just want to let it run when you change a Sass (*.scss) file.

Or let it watch for everything:

`grunt watch`

As all images will be changed everytime, depending on your deployment it could be that you should exclude images from the watchers. Also it could take a lot of time when you got a lot of pictures. So run `grunt image` when you are finished with handling images.


