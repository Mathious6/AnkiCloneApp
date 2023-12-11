import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';

class Tag extends Model {
    public tagId!: number;
    public englishKeyword!: string;
    public frenchTranslation: string;
}

Tag.init({
    tagId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    englishKeyword: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    frenchTranslation: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'Tag',
    sequelize: sequelize,
});

export default Tag;
