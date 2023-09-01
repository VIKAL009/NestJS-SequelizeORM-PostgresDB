import { Sequelize } from 'sequelize-typescript';
import { UserPreferences } from 'src/modules/user-preferance/user-preferance.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5434,
        username: 'postgres',
        password: 'abc123',
        database: 'config-service',
      });
      sequelize.addModels([UserPreferences]);
      await sequelize.sync();
      return sequelize;
    },
  },
];



// import { Sequelize } from 'sequelize-typescript';
// import { ConfigService } from './../modules/config/config.service';
// import { UserPreferences } from './../modules/user-preferance/user-preferance.entity';

// export const databaseProviders = [
//     {
//         provide: 'SEQUELIZE',
//         useFactory: async (configService: ConfigService) => {
//             const dbOptions = configService.sequelizeOrmConfig;
//             const sequelize = new Sequelize(dbOptions.name, dbOptions.username, dbOptions.password, {
//                 host: dbOptions.host,
//                 port: dbOptions.port,
//                 dialect: dbOptions.dialect,
    
//                 // operatorsAliases: false,
//                 logging: !dbOptions.loggingEnabled ? false : console.log,
//                 dialectOptions: {
//                     ssl:
//                         // rejectUnauthorized: false,
//                         dbOptions.ssl != undefined ? JSON.parse(dbOptions.ssl) : false,
//                 },
//                 pool: {
//                     max: dbOptions.poolSize || 15,
//                     min: 0,
//                     acquire: 40000,
//                     idle: 10000,
//                     maxUses: 100,
//                 },
//                 define: {
//                     underscored: true,
//                     freezeTableName: true,
//                     timestamps: false,
//                     schema: dbOptions.schemaName,
//                     charset: 'utf8',
//                     collate: 'utf8_general_ci',
//                 },
//             })
//             sequelize.addModels([UserPreferences]);
//             // await sequelize.sync();
//             return sequelize;
//         },
//         inject: [ConfigService],
//     },
// ];