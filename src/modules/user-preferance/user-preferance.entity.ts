import {
  AutoIncrement,
  Column,
  DataType,
  Length,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';


@Table({
  tableName: 'user_preferences',
})
export class UserPreferences extends Model<UserPreferences> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  
  @Length({
    min: 3,
    max: 60,
    msg: `The length of name  can't be shorter than 3 and longer than 60 `,
  })
  @Column({
      type: DataType.STRING,
      field: 'username',
  })
  username: string;

  @Column(DataType.UUID)
  tenantId: string;

  @Column({type: DataType.STRING, field: 'user_favorite_menus'})
  userFavoriteMenus: string;

  @Column({type: DataType.BOOLEAN, field: 'dark_theme'})
  darkTheme: boolean;

  
  @Column({type: DataType.STRING, field: 'color_scheme', allowNull: true})
  colorScheme: string ;
  
  @Column({type: DataType.STRING, field: 'user_role', allowNull: true})
  userRole: string ;

  @Column({type: DataType.STRING, field: 'label', allowNull: true})
  label: string ;
  
  @Column({type: DataType.STRING, field: 'parent', allowNull: true})
  parent: string ;

  @Column({type: DataType.STRING, field: 'icon', allowNull: true})
  icon: string ;

  @Column({type: DataType.STRING, field: 'path', allowNull: true})
  path: string ;

  @Column({type: DataType.STRING, field: 'type', allowNull: true})
  type: string ;

}