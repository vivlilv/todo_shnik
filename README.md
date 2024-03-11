# todo_shnik
Main idea of creating this project is to enhance skills of web development and practice new concepts. I used Django and Django Rest Framework to build APIs and React to consume them. 
As for first commit:
  this version is very limited, but can be called an MVP
Functionality overview:
1) Users can login, logout (tokens approach used, stored in localStorage)
2) Users can **view**, **add** new and **remove** tasks from the tasklist
    -the main detail here is that each user has their own tasks, and can only access their own tasks


In most recent future I am planning to add EDIT functionality to tasks, also enhance the interface visually(CCS styling).



Quick recap on learned stuff:
1) understood why we need to use serializers(to grasp specific data from tables)
2) django rest framework with its browsable api's (used them to quickly discover how to consume them with frontend and which fields they have. For example by request.token we can access user.pk user.username etc.)
3) only used third party packages, honestly can't clearly say what which part is responsible for (just plugg-n-played with help of Django for APIs book)

for frontend:
1) of course useState, useEffect to give components state and rerender 'em when it changes
2) got idea to use wrapper component HomepageWrapper to show user login page or main page conditionally
2.5) got help from GPT to use props and call customly created onLogin, onLogout in child components
3) started using headers in my requests (although mainly taken as answers from GPT and not initially my idea)
4) a little work with html forms and updating data dynamically by using handleInputChange()




honestly, not a lot of results as I thought here will be, but...heck, it works and I mainly wrote it by myself, structured myself and practiced.
Bilyanchick pryvit(or default_cloud you name it!!!)
