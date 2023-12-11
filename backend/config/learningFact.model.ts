import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';
import LearningPackage from './learningPackage.model';
import User from "./user.model";

class LearningFact extends Model {
    public factId!: number;
    public front!: string;
    public back!: string;
    public source!: string;
    public relatedImages: string;
    public relatedLinks: string;
    public isActive!: boolean;
    public packageId!: number;
    public userId!: number;
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
        relatedImages: {
            type: new DataTypes.STRING(512),
            allowNull: true,
        },
        relatedLinks: {
            type: new DataTypes.STRING(512),
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        learningPackageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LearningPackage,
                key: 'packageId',
            },
        },
    },
    {
        tableName: 'LearningFact',
        sequelize,
    }
);

export default LearningFact;
