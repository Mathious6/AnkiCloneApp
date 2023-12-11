import {DataTypes, Model, Sequelize} from 'sequelize';
import {sequelize} from './database';

class User extends Model {
    public userId!: number;
    public mail!: string;
    public pseudo!: string;
    public password!: string;
    public registrationDate!: Date;
    public profilePicture: string;
    public isActive!: boolean;
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registrationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        tableName: 'User',
        sequelize: sequelize, // this bit is important
    }
);

export default User;
