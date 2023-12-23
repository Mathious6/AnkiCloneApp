import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';
import LearningFact from './learningFact.model';
import User from './user.model';
import userPackageLearning from './userLearningPackage.model';

class UserLearningFact extends Model {
    public userLearningFactId!: number;
    public reviewCount!: number;
    public confidenceLevel!: string;
    public lastReviewed!: Date;
    public nextReviewDate!: Date;
    public userPackageLearningId!: number;
    public factId!: number;
    public userId!: number;
}

UserLearningFact.init({
    userLearningFactId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    reviewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    confidenceLevel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastReviewed: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    nextReviewDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userPackageLearningId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userPackageLearning,
            key: 'userPackageLearningId'
        }
    },
    factId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LearningFact,
            key: 'factId'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    }
}, {
    tableName: 'UserLearningFact',
    sequelize: sequelize,
});

export default UserLearningFact;
