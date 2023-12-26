"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("./database");
const user_model_1 = require("./user.model");
const learningPackage_model_1 = require("./learningPackage.model");
class UserLearningPackage extends sequelize_1.Model {
}
UserLearningPackage.init({
    userPackageLearningId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    expectedEndDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    minutesPerDayObjective: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    progress: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    disable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.default,
            key: 'userId'
        }
    },
    learningPackageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: learningPackage_model_1.default,
            key: 'packageId'
        }
    }
}, {
    tableName: 'UserLearningPackage',
    sequelize: database_1.sequelize,
});
exports.default = UserLearningPackage;
//# sourceMappingURL=userLearningPackage.model.js.map