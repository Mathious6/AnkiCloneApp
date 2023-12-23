import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';
import User from './user.model';
import LearningPackage from './learningPackage.model';

class UserLearningPackage extends Model {
    public userPackageLearningId!: number;
    public startDate!: Date;
    public expectedEndDate: Date;
    public minutesPerDayObjective: number;
    public progress!: number;
    public disable!: boolean;
    public userId!: number;
    public learningPackageId!: number;
}

UserLearningPackage.init({
    userPackageLearningId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    startDate: {
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
    disable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    learningPackageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LearningPackage,
            key: 'packageId'
        }
    }
}, {
    tableName: 'UserLearningPackage',
    sequelize: sequelize,
});

export default UserLearningPackage;
