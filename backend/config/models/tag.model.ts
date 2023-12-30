import {DataTypes, Model, Sequelize} from 'sequelize';

class Tag extends Model {
    public tagId!: number;
    public englishKeyword!: string;
    public frenchTranslation: string;

    static initModel(sequelize: Sequelize) {
        Tag.init(
            {
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
            },
            {
                tableName: 'Tag',
                sequelize,
            }
        );
    }
}

export default Tag;
