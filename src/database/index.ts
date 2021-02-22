import { createConnection, Connection } from 'typeorm';

async function InitializeTypeORM(): Promise<Connection> {
  const connection = await createConnection('default');

  return connection;
}

export default InitializeTypeORM;
