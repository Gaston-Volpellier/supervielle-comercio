This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Requerimientos del servidor

MySQL
NodeJS v18 o superior
## Deploy en Local

Primero que nada se debe tener una base de datos MySQL creada.

Importar el archivo Supervielle.sql (ubicado en database/Supervielle.sql) con el schema y estructura de tablas a la base de datos creada.

Luego se deben instalar las dependencias:

```bash
npm install
```

Luego se debe clonar el archivo de variables de entorno .env.development y renombarlo como env.local
Declarar en dicho archivo las variables correspondientes a la cadena de conexión a la base de datos y el dominio que se va a utilizar:

Ejemplo:

```bash
DB_NAME='nombre_base'
DB_PASSWORD="password"
DB_USER="user_db"
DB_HOST="localhost"
DB_PORT=puerto
BASE_URL="http://localhost:3000"
```

Luego iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el explorador para visualizar la aplicación montada.

## Deploy en Producción

Primero que nada se debe tener una base de datos MySQL creada.

Importar el archivo Supervielle.sql (ubicado en database/Supervielle.sql) con el schema y estructura de tablas a la base de datos creada.

Luego se deben instalar las dependencias:

```bash
npm install
```

Luego se debe clonar el archivo de variables de entorno .env.development y renombarlo como env.local
Declarar en dicho archivo las variables correspondientes a la cadena de conexión a la base de datos y el dominio que se va a utilizar:

Ejemplo:

```bash
DB_NAME='nombre_base'
DB_PASSWORD="password"
DB_USER="user_db"
DB_HOST="localhost"
DB_PORT=puerto
BASE_URL="https://midominio.com/
```

Para iniciar el servidor de producción:

```bash
npm run start
```