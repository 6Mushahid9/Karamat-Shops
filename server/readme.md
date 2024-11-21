1. npm init -y
2. npm install express mongoose cors nodemon
3. configured nodemon
4. made cluster and connected server to DB


flush all shops.

2 new models : shop and receet
shop : number, owner, due, reciet[]
reciet: name, date, amount (when inserted / saved change due amount), type(cash/check)-if check 3 new fields

create all shops again (later he can remove one from DB, but i need route to create a new one)

a route to edit shop details

a route to remove reciet

work on shop modal: 
display details and an edit button
2 buttons- history(if none then message) and new raseed (with SAVE button)
💡 modal will have just details and 2 buttons, 
    when new is pressed raseed will form in middle and new --> save
    when history is pressed cards will apear in middle remove both buttons


