# Receipt Generator Microservice
 
This project is aimed to provide a service of generating pdf receipt and send to specified email address.

## Functional Requirements
- Generate Receipt in pdf file format
- Send Receipt to specified email address
- Generate Recipt with template (if provided)
- Access Control (allow only authorized systems to use this service)

## To Run this project locally (visual studio code)
1. Open up terminal (ctrl + `)
2. To install project dependencies, type -> **npm i** 
3. To Start pproject with Nodemon, type -> **npx nodemon index.js**

## Projec Components Intro
- The **Public** folder consists of static files that are intended to be served publicly.
- The Receipt will be generated as html email to be sent to intended receiver