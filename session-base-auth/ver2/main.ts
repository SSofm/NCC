import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config({path: '.env'});
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT || 8000;
  console.log(`App is running on ${port}`);
  
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  )
  
// dung configmodule


  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(port);
}
bootstrap();
