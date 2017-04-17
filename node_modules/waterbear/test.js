var waterbear = require('./index.js');
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
console.log(waterbear(tpl, data));
