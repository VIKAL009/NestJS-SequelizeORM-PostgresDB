
const generateDBUrl = () => {
  return `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOSTNAME}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${process.env.DATABASE_SCHEMA}`
}
const appConfig = {
  port: process.env.PORT || 3000,
  kafkaServer: process.env.KAFKA_SERVER || 'localhost',
  kafkaPort: process.env.KAFKA_PORT || 9092,
  jwtSecret: process.env.JWT_SECRET || 'muy3438765rterererererrer', 
  JwtAccessTokerExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '1d',
  JwtRefreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '1d',
  databaseUrl: generateDBUrl() || process.env.DATABASE_URL,
}

export { appConfig }

