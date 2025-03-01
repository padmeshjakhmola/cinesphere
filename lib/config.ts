const config = {
  env: {
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY!,
    awsBucketname: process.env.AWS_BUCKET_NAME!,
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID!,
    awsRegion: process.env.AWS_REGION!,
    databaseUrl: process.env.DATABASE_URL!,
  },
};

export default config;
