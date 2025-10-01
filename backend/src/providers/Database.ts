import mongoose from 'mongoose'
import bluebird from 'bluebird'

import Locals from './Locals'
import Log from '../middlewares/Log'
import { CallbackError } from 'mongoose'
import cachegoose from 'recachegoose'

export class Database {
  // Initialize your database pool
  public static init(): void {
    const dsn = Locals.config().mongooseUrl + `?retryWrites=false&replicaSet=myReplicaSet`
    ///const dsn = Locals.config().mongooseUrl

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false,
      useCreateIndex: true,
    }
    ;(<any>mongoose).Promise = bluebird

    //mongoose.set('useCreateIndex', true);
    this.redisCache()
    mongoose.connect(dsn, options, (error: CallbackError) => {
      // handle the error case
      if (error) {
        Log.info('Failed to connect to the Mongo server!!')
        console.log(error)
        throw error
      } else {
        Log.info('connected to mongo server at: ' + dsn)
      }
    })
  }

  public static redisCache = () => {
    cachegoose(mongoose, {
      engine: 'redis',
      port: +process.env.REDIS_QUEUE_PORT!,
      host: process.env.REDIS_QUEUE_HOST,
    })
  }

  public static getInstance = () => {
    return mongoose.connection
  }
}

export default mongoose
