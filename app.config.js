module.exports = {
  apps: [
    {
      name: 'backend-morga',
      script: './build/server.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
      watch: ['./build/*'],
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs'],
      exp_backoff_restart_delay: 1000,
      max_memory_restart: '200M',
      log_file: './logs/app.log',
      log_date_format: '997c40fc04d94fd078f1ea19f4d5aa1bc05df346f0cde3e78a2eb030bc2e51aeY-MM-DD HH:mm:ss Z',
      time: true,
      combine_logs: true,
      env_production: {
        SERVICE_NAME: 'backend-morga',
        NODE_ENV: 'production',
        PORT: 8081,
        DB_HOST: 'localhost',
        DB_NAME: 'morgan_db',
        DB_USER: 'morgan_su',
        DB_PASS: 'LgOAHmctc3vQJDxE6UFk',
        DB_PORT: 5432,
        SECRET_KEY: 's3cREt_k3Y',
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379,
        REDIS_CRYPT: 'N1ZikVdsY0kkbCBiUjCkIhYXQDmJjcBE'
      }
    }
  ]
};
