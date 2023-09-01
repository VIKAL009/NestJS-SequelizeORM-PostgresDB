import { Inject, Injectable } from '@nestjs/common';
import { UserPreferenceDto, UserPreferenceRequestDto } from './user-preferance.dto';
import { UserPreferences } from './user-preferance.entity';
const jwt = require('jsonwebtoken');
const { Client } = require('pg');


@Injectable()
export class UserPreferanceService {

  constructor(@Inject('UserPreferencesRepository')
  private readonly userPrefRepository: typeof UserPreferences) {

  }

  async getCommonRoles(Roles): Promise<any[]> {

    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'config-service',
      password: 'abc123',
      port: '5434',
    });
    
    try {
      await client.connect();
   
      const query = `
      SELECT *
      FROM user_preferences
      WHERE EXISTS (
      SELECT 1
      FROM unnest(string_to_array(user_role, ',')) AS role
      WHERE role = ANY($1)
      );
      `;

const result = await client.query(query, [Roles]);
      return result.rows;
    } catch (err) {
      console.error('Error executing PostgreSQL query', err);
      throw err; 
    } finally {
      await client.end();
    }
  }
  
async getUserPreferance(userPreferenceDto: UserPreferenceRequestDto, authorizationHeader:string) {
    try {
      const results = await  this.userPrefRepository.findAll<UserPreferences>({
        where: {
          username: userPreferenceDto.username, // Add your specific condition here
          tenantId: userPreferenceDto.tenantId
        },
      })

      const token = authorizationHeader.split(' ')[1];
      // const decodedToken = jwt.verify(token, 'your_secret_key'); 
      const decodedToken = jwt.decode(token);
      const roles = decodedToken.realm_access.roles;
      const common_roles = {};
      const mySet = new Set();
      roles.forEach((data)=>{
            mySet.add(data);
      })
      
      const user_array = ["expert","director","xyz"];
      const users_with_common_roles = await this.getCommonRoles(user_array);

      const Lookup = {};
      const valuesArray = Object.values(users_with_common_roles);
      valuesArray.forEach((item)=>{
        const { id,label,parent,user_role } = item;
        const newItem = { label,user_role, children: [] };
        
        if (item.parent !== 'null') {
          if (!Lookup[item.parent]) {
            Lookup[item.parent] = { label,user_role, children: [] };
          }
          Lookup[item.parent].children.push(newItem);
        } else {
          Lookup[id] = newItem;
        }
      })
      console.log(Lookup,typeof Lookup);
      return Lookup;

    } catch (error) {
      console.error('Error to fecth user preference', error)
      return null
    }
  }

  async postFavoriteMenu(userPrefDto: UserPreferenceDto,authorizationHeader :string): Promise<any | null> {
   
    try {
      const userPref = await this.getUserPreferance( {username:userPrefDto.username, tenantId: userPrefDto.tenantId},authorizationHeader);
      const userPref1 = userPref && userPref[0] ? userPref[0] : null
      
      console.log(userPref,userPref1);
      if(userPref1) 
      { 
        // userPref1.userFavoriteMenus = userPrefDto.preferencesMenu
      // const updatedUserPreference = this.userPrefRepository.update({  
      //   where: { username },
      //   data: {
      //     user_favorite_menus: menus,
      //   },
      // })
      //  return userPref1.save();
       return "user already exists with this user name";
      } else {
        // insert a new record for the user
        return await this.userPrefRepository.create({
          username: userPrefDto.username, 
          userFavoriteMenus: userPrefDto.preferencesMenu, 
          tenantId: userPrefDto.tenantId, 
          darkTheme: userPrefDto.darkTheme, 
          colorScheme: userPrefDto.colorScheme,
          userRole:userPrefDto.userRole, 
          label:userPrefDto.label,
          parent:userPrefDto.parent,
          icon:userPrefDto.icon,
          path:userPrefDto.path
        })
      }
    } catch (error) {
      // Handle any errors that 
      console.error('Error updating user preference', error)
      return null
    }
  }
  
}