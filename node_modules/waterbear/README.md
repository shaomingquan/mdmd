# waterbear

it's tiny as a small bug. but more fast.

```
ejs: 16.494ms
waterbear: 2.457ms
```

features as base ejs
- Control flow with `<% %>`.
- Unescaped raw output with `<%- %>`.

no include.

example: fe or nodejs.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>test waterbear</title>
        <script src="./index.js"></script>
    </head>
    <body>
        <div id="content">

        </div>
        <script type="text/javascript">
            var tpl = `
                <div>
                    <h2><%- title %></h2>
                    <p><%- content %></p>
                    <ul>
                        <% for(var i = 0 ; i < users.length ; i ++) { user = users[i] %>
                            <li>
                                <b><%- user.firstName %></b>
                                <span><%- user.lastName %></span>
                            </li>
                        <% } %>
                    </ul>
                    <p><%- (new Date()).toDateString() %></p>
                </div>
            `;

            var data = {
                title: 'test',
                content: 'test waterbear render',
                users: [
                    {
                        firstName: 'li',
                        lastName: 'lei'
                    },
                    {
                        firstName: 'han',
                        lastName: 'meimei'
                    }
                ]
            };

            document.getElementById('content').innerHTML = waterbear(tpl, data);
        </script>
    </body>
</html>

```
