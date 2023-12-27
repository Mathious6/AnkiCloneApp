"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_2 = require("sequelize");
const database_2 = require("./database");
const user_model_2 = require("./user.model");
const learningPackage_model_2 = require("./learningPackage.model");
class UserPackageLearning extends sequelize_2.Model {
}
UserPackageLearning.init({
    userPackageLearningId: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    startDate: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_2.DataTypes.NOW,
    },
    expectedEndDate: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: true,
    },
    minutesPerDayObjective: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: true,
    },
    progress: {
        type: sequelize_2.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    disable: {
        type: sequelize_2.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_2.default,
            key: 'userId'
        }
    },
    learningPackageId: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: learningPackage_model_2.default,
            key: 'packageId'
        }
    }
}, {
    tableName: 'UserPackageLearning',
    sequelize: database_2.sequelize,
});
exports.default = UserPackageLearning;
//# sourceMappingURL=userPackageLearning.model.js.map