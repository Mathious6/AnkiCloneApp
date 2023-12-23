import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';
import LearningPackage from './learningPackage.model';
import User from "./user.model";

class LearningFact extends Model {
    public factId!: number;
    public front!: string;
    public back!: string;
    public source!: string;
    public relatedImage: string;
    public relatedLink: string;
    public isActive!: boolean;
    public packageId!: number;
    public creatorId!: number;
}

LearningFact.init(
    {
        factId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        front: {
            type: new DataTypes.STRING(512),
            allowNull: false,
        },
        back: {
            type: new DataTypes.STRING(512),
            allowNull: false,
        },
        source: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
        relatedImage: {
            type: new DataTypes.STRING(512),
            allowNull: true,
        },
        relatedLink: {
            type: new DataTypes.STRING(512),
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        packageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LearningPackage,
                key: 'packageId',
            },
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
        tableName: 'LearningFact',
        sequelize,
    }
);

export default LearningFact;
