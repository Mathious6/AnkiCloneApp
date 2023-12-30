import {DataTypes, Model, Sequelize} from 'sequelize';
import LearningFact from './learningFact.model';
import User from './user.model';

class UserLearningFact extends Model {
    public userLearningFactId!: number;
    public reviewCount!: number;
    public confidenceLevel!: string;
    public lastReviewed!: Date;
    public nextReviewDate!: Date;
    public factId!: number;
    public userId!: number;

    static initModel(sequelize: Sequelize) {
        UserLearningFact.init(
            {
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
            },
            {
                tableName: 'UserLearningFact',
                sequelize: sequelize,
            }
        );
    }
}

export default UserLearningFact;
