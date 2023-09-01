import { Injectable } from '@nestjs/common';
// import { User, Locale, Role } from '@prisma/client'

@Injectable()
export class LocalizationService {
  constructor() {}
  // Method to fetch language options based on the provided key value
  // keyval: The key value used to search for language options
  // Returns a Promise that resolves to an array of Locale objects or null if no matching language options are found
  async getLangOptions(keyval: string): Promise<any> {
    // Use the PrismaService to query the database for language options
    // The 'findMany' method is used to retrieve multiple records that match the specified 'lang' property
    // 'where' clause specifies the condition to search for matching 'lang' property
    // The 'keyval' parameter is used as the value to search for in the 'lang' property
    // return this.prisma.locale.findMany({
    //   where: {
    //     lang: keyval,
    //   },
    // })
  }
}
