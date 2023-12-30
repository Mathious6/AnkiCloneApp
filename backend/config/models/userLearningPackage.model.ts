import {DataTypes, Model, Sequelize} from 'sequelize';
import User from './user.model';
import LearningPackage from './learningPackage.model';

class UserLearningPackage extends Model {
    public userLearningPackageId!: number;
    public startDate!: Date;
    public expectedEndDate: Date;
    public minutesPerDayObjective: number;
    public progress!: number;
    public userId!: number;
    public learningPackageId!: number;

    static initModel(sequelize: Sequelize) {
        UserLearningPackage.init(
            {
                userLearningPackageId: {
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
            },
            {
                tableName: 'UserLearningPackage',
                sequelize,
            }
        );
    }
}

export default UserLearningPackage;