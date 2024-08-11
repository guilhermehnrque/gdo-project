const sequelize = require('../config/database');

const User = require('./user')(sequelize);
const Groups = require('./groups')(sequelize);
const Local = require('./local')(sequelize);
const Schedule = require('./schedule')(sequelize);
const List = require('./list')(sequelize);
const Guest = require('./guest')(sequelize);
const GroupsUsers = require('./groupsUsers')(sequelize);
const PlayersList = require('./playersList')(sequelize);

module.exports = {
    User,
    Groups,
    Local, 
    Schedule,
    List,
    Guest,
    GroupsUsers,
    PlayersList,
    sequelize,
};