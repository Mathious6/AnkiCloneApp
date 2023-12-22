import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';
import User from './user.model';

class LearningPackage extends Model {
    public packageId!: number;
    public title!: string;
    public description: string;
    public category: string;
    public targetAudience: string;
    public duration: number;
    public creationDate!: Date;
    public creatorId!: number;
}

LearningPackage.init(
    {
        packageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(512),
            allowNull: true,
        },
        category: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        targetAudience: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        creationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userId',
            },
        },
    },
    {
        tableName: 'LearningPackage',
        sequelize,
    }
);

export default LearningPackage;
