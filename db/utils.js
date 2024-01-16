const db = require('./db');

const fetchUser = (email) => {
    return db.any('SELECT * FROM ccmanagement."User" WHERE email = ${email}', {
        email: email
    });
}

const fetchUserList = () => {
    return db.any('SELECT * FROM ccmanagement."User"');
}

const fetchClientsList = () => { 
    return db.any(`SELECT * FROM ccmanagement."Client"`);    
}

const insertClient = (newClientName, newClientDes) => {
    return db.any('INSERT INTO ccmanagement."Client" (client_name, created_date, created_by, description) VALUES (${newClientName}, ${today}, ${createdBy}, ${newClientDes})', {
        today: new Date(),
        createdBy: 'PhuocN',
        newClientName: newClientName,
        newClientDes: newClientDes
    });
}

const insertProject = (name, startDate, endDate, client, assignee) => {
    return db.any('INSERT INTO ccmanagement."Project" (name, start_date, end_date, client, assignee) VALUES (${name}, ${startDate}, ${endDate}, ${client}, ${assignee})', {
        name: name,
        startDate: startDate,
        endDate: endDate,
        client: client,
        assignee: assignee
    });
}

const fetchProjectList = () => {
    return db.any(`
        SELECT p.*, c.client_name, u.username
        FROM ccmanagement."Project" p
        JOIN ccmanagement."Client" c ON p.client = c.id
        JOIN ccmanagement."User" u ON p.assignee = u.id
    `);
}

module.exports = {
    fetchUser, 
    fetchClientsList,
    insertClient,
    fetchUserList,
    insertProject,
    fetchProjectList
}