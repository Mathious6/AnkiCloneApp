
import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';
import User from './user.model';
import LearningPackage from './learningPackage.model';

/*class UserLearningPackage extends Model {
    public userLearningPackageId!: number;
    public startDate!: Date;
    public expectedEndDate: Date;
    public minutesPerDayObjective: number;
    public progress!: number;
    public userId!: number;
    public learningPackageId!: number;
}*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("./database");
const user_model_1 = require("./user.model");
const learningPackage_model_1 = require("./learningPackage.model");

class UserLearningPackage extends sequelize_1.Model {
}
/*UserLearningPackage.init({
    userLearningPackageId: {
        type: DataTypes.INTEGER,
//=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("./database");
const user_model_1 = require("./user.model");
const learningPackage_model_1 = require("./learningPackage.model");
class UserLearningPackage extends sequelize_1.Model {
}*/
UserLearningPackage.init({
    userPackageLearningId: {
        /*type: sequelize_1.DataTypes.INTEGER,
//>>>>>>> lucile
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    startDate: {
//<<<<<<< HEAD
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    expectedEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    minutesPerDayObjective: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    progress: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,*/
//=======
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
//>>>>>>> lucile
            key: 'userId'
        }
    },
    learningPackageId: {
/*<<<<<<< HEAD
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LearningPackage,*/
//=======
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: learningPackage_model_1.default,
//>>>>>>> lucile
            key: 'packageId'
        }
    }
}, {
    tableName: 'UserLearningPackage',
    //sequelize: sequelize,
    sequelize: database_1.sequelize,
});
exports.default = UserLearningPackage;
export default UserLearningPackage;
//=======

//});

//# sourceMappingURL=userLearningPackage.model.js.map

