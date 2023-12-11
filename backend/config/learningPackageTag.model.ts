import {DataTypes, Model} from 'sequelize';
import {sequelize} from './database';
import LearningPackage from './learningPackage.model';
import Tag from './tag.model';

class LearningPackageTag extends Model {
    public learningPackageTagId!: number;
    public packageId!: number;
    public tagId!: number;
}

LearningPackageTag.init({
    learningPackageTagId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LearningPackage,
            key: 'packageId'
        }
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tag,
            key: 'tagId'
        }
    }
}, {
    tableName: 'LearningPackageTag',
    sequelize: sequelize,
});

export default LearningPackageTag;
