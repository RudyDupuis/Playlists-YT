const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const Playlist = sequelize.define("Playlist", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    videos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    }
});

module.exports = Playlist;
